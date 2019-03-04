<style lang="scss" src="./css/seckill.scss" scoped></style>
<template>
  <div id="seckill">
    <div class="content">
      <!-- 头部导航 -->
      <!-- <bl-bar flex barStyle="bar-white">
        <div class="button" slot="left-button" v-back>
          <div class="iconfont arrow-back"></div>
        </div>
        <div slot="title"><img src="./img/seckill-title.png"></div>
        <div class="button" slot="right-button" @click="toggleActivityuleRule('show')">活动规则</div>
      </bl-bar> -->
      <v-mobile-head :title="title" style="border-bottom: #ccc 1px solid" :showBackRightbuttons="true"><a slot="btn-right" @click.stop="toggleActivityuleRule('show')">活动规则</a></v-mobile-head>
    </div>
    <!-- 秒杀时间段 -->
    <div class="time-menu" v-if="timeList && timeList.length > 0">
      <div class="select-box"></div>
      <div class="menu-box" id="menu-box" ref="secKillTime" @touchstart="touchStart" @touchend="touchEnd">
        <ul id="scrollbox">
          <li v-for="(time, index) in secKillTimeList" :key="index" @click.stop="chooseTime(time, index)" ref="originSelectBox">
            <div class="menu-detail">
              <div class="detail-box end" :class="{'choosed': time.isNowTime}">
                <p>{{time.beginHour}}:00</p>
                <p>{{time | getStatusFilter(dateList[indexDateNow].serviceTime)}}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 倒计时 -->
    <div class="top-time-box" v-if="canShowCountDown">
      <div class="top-time">
        <div class="time-text" v-text="countDownTitleHead"></div>
        <div class="time-box" v-text="countDownTime.hours"></div>:<div class="time-box" v-text="countDownTime.minutes"></div>:<div class="time-box" v-text="countDownTime.seconds"></div>
        <div class="time-text" v-text="countDownTitleBottom"></div>
      </div>
    </div>
    <template>
      <!-- 秒杀列表 -->
      <div class="kill-list">
        <ul>
          <li v-for="(itemG, index) in couponList.secondKillGoodsDTOList" :key="index" @click.stop="grabTickets(itemG)">
            <div class="kill-box">
              <div class="kill-img">
                <img :src="itemG.picUrl">
                <div class="kill-logo">预约券</div>
                <div class="out-img" v-if="itemG.status == 'saleOut'">
                  <img src="./img/out-img.png"/>
                </div>
              </div>
              <span style='color:red'>【预约券】</span>
              <div class="kill-name" v-text="itemG.goodsName"></div>
              <div class="kill-price">
                <div class="kill-button-box">
                  <div class="kill-button" :class="itemG.status == 'saleOut' || itemG.status == 'soon' ? 'sale-out' : ''">
                    <template v-if="itemG.status == 'saleOut'">
                      已抢光
                    </template>
                    <template v-if="itemG.status == 'begin'">
                      立即开抢
                    </template>
                    <template v-if="itemG.status == 'soon'">
                      即将开抢
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </li>
          
          <li>
            <div class="kill-box">
              <div class="kill-img">
                <img src="./img/footprint1.jpg">
                <div class="kill-logo">秒杀</div>
                <div class="out-img">
                  <img src="./img/out-img.png"/>
                </div>
              </div>
              <div class="kill-name"><span v-text="brandTitle"></span> 伊斯紧致打我打我稍等安慰大声对我订单安慰</div>
              <div class="kill-price">
                <div class="price">
                  <p class="through">￥48.00</p>
                  <p class="real"><span>￥</span>38.00</p>
                </div>
                <div class="kill-button-box">
                  <div class="kill-button sale-out">
                    已抢光
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="kill-box">
              <div class="kill-img">
                <img src="./img/footprint1.jpg">
                <div class="kill-logo">秒杀</div>
                <!-- <div class="out-img">
                  <img src="./img/out-img.png"/>
                </div> -->
              </div>
              <div class="kill-name"><span v-text="brandTitle"></span> 百事可乐220ml</div>
              <div class="kill-price">
                <div class="price">
                  <p class="through">￥4.00</p>
                  <p class="real"><span>￥</span>0.01</p>
                </div>
                <div class="kill-button-box">
                  <div class="kill-button" @click.stop="quickBuy">
                    立即开抢
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 列表结尾 -->
      <div class="bottom-end">
        <div class="line"></div>
        <div>END</div>
        <div class="line"></div>
      </div>
    </template>
    <!-- 活动规则 -->
    <div class="modal modal-in" v-if="showActivityRule">
      <div class="modal-inner">
        <div class="modal-title hairline">活动规则</div>
        <div class="modal-text">
          <p v-html="secKillInfo.skillRule"></p>
        </div>
      </div>
      <div class="modal-buttons">
        <div class="modal-button" @click="toggleActivityuleRule('hide')">知道啦</div>
      </div>
    </div>

    <!-- 非秒杀资质弹窗 -->
    <div class="seckill-popup" v-if="showQualification">
      <div class="seckill-frame">
        <div class="seckill-icon1"></div>
        <div class="seckill-word" v-text="errMsg"></div>
      </div>
    </div>
    <div class="mark" v-if="showMark"></div>
  </div>
</template>

<script>
  import api from './api/index'
  import utils from '../../utils'
  export default {
    data () {
      return {
        title: '秒杀列表',
        brandTitle: '[秒杀]',
        // 查看规则标识
        showActivityRule: false,
        // 遮罩
        showMark: false,
        // 是否有资质
        showQualification: false,
        activityRuleDetails: {},
        // 秒杀信息
        secKillInfo: {
          skillRule: '秒杀信息'
        },
        // 秒杀日期
        secKillDates: [],
        // 秒杀时间
        secKillTimes: [],
        // 错误信息
        errMsg: '',
        indexDate: '',
        dateList: [],
        timeList: [],
        couponList: [],
        countDownTitleHead: '本场还剩',
        countDownTitleBottom: '结束',
        canShowCountDown: false,
        countDownTime: {},
      }
    },
    computed: {},
    methods: {
      // 立即购买
      quickBuy() {
        console.log("立即购买")
      },
      // 查看秒杀规则
      toggleActivityuleRule(type) {
        if (type && type == 'show') {
          this.showActivityRule = true
          this.showMark = true
          utils.fixedBody()
        } else {
          this.showActivityRule = false
          this.showMark = false
          utils.looseBody()
        }
      },
      toggleQualifications(type) {
        if (type && type == 'show') {
          this.showQualification = true
          this.showMark = true
          utils.fixedBody()
        } else {
          this.showQualification = false
          this.showMark = false
          utils.looseBody()
        }
      },
      // 查询秒杀资格
      queryQualificationsByMemberId() {
        console.log("查询秒杀资格")
      },
      // 查询秒杀优惠券列表
      querySeckillCouponList() {
        console.log("查询秒杀优惠券列表")
      },
      // 获取活动时间列表
      getTimeList() {
        // 获取日期列表
      },
      // 获取优惠券列表
      findCoupons(opt) {
        console.log("获取优惠券列表:", opt, this.secKillInfo.activityRange[this.indexDate].serviceTime, opt.endTime)
      },
      grabTickets(opt) {
        console.log(opt)
        // this.$router.push({path: '/secKillDetail', query: {actTime: opt.activityCode, skuID: opt.goodsSid}})
      },
    },
    created() {
      // 查询秒杀资格
      this.queryQualificationsByMemberId()
    },
    mounted () {
    },
    filters: {
    },
    components: {}
  }
</script>

