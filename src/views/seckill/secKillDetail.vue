<style lang="scss" src="./css/seckillDetail.scss" scoped></style>
<template>
  <div id="singleproduct">
    <bl-h5-header :isBack="true"></bl-h5-header>
      <bl-slide :ad="false" :slides="allSlides" :autoPlay="true"></bl-slide>
    <div class="panicbuying-title">
        <div class="panicbuying-left">
          <i></i><strong>{{secKillstateNmae}}</strong>{{secKillstateNmae1}}
        </div>
        <div class="panicbuying-right" v-if="secKillstateFlag">
          <i></i>剩余:
          <bl-countdown v-if="timeRemaining" :diffTime="timeRemaining"></bl-countdown>
        </div>
    </div>
    <div class="product-name"><span>预约券</span>{{seckillDetailResult.detail ? seckillDetailResult.detail.goodsName : ''}}
    </div>
    <div class="button-container">
          <div class="config-buy seckill" :class="buttonFlag ? 'no-goods' : ''" @click="draw">{{buttonName}}</div>
    </div>
    <div class="seckill-popup" v-if="mackFlag">
      <div class="seckill-frame">
        <div class="seckilol-close" @click="closeMack"></div>
        <div class="seckill-icon2" v-if="mackNextFlag == '1' || successFlag"></div>
        <div class="seckill-icon1" v-else></div>
        <div class="seckill-word" v-html="msg"></div>
        <div class="line-frame">
          <a class="seckill-button" v-if="mackNextFlag != 0" href="javascript:void(0);" @click="sure()">确定</a>
          <div class="seckill-cooltime" v-if="successFlag">{{time}}</div>
        </div>
      </div>
    </div>
    <div class="mark" v-if="mackBackFlag"></div>
  </div>
</template>
<script>
  import api from './api'
  export default {
    data() {
      return {
          msg: '', // 领取状态文描
          seckillDetailResult: {}, // 领取结果
          mackFlag: false, // 弹框标志
          mackBackFlag: false, // 弹框蒙层flag
          mackNextFlag: '2', //  隐藏 0 展示1 1、2区分不同点击事件
          buttonName: '', // 按钮名称
          buttonFlag: false, // 按钮状态
          secKillstateNmae: '',
          secKillstateNmae1: '',
          secKillstateFlag: true,
          allSlides: [], // 图片
          timeRemaining: '',
          actTime: this.$route.query.actTime, // 商品ID
          skuID: this.$route.query.skuID, // 场次信息
          successFlag: false,
          time: '5s'
      }
    },
    mounted() {
      this.init()
      let _this = this
      window.addEventListener('message', function(e) {
        if (e.data && e.data.resCode != '' && e.data.resCode != null) {
          _this.showMack(e.data)
        }
      })
    },
    methods: {
      init() {
        api.querySeckillQualifications({ // 是否有秒杀资格
          memberId: this.memberId,
        }).then(res => {
          if (res.body.resCode == "00100000") {
            this.querySeckillCouponDetail()
          } else {
            this.mackFlag = true
            this.msg = res.body.msg
            this.mackNextFlag = '0'
          }
        })
        window.sa.track('$pageview', {
          pageId: 'H5_秒杀_' + this.skuID,
          categoryId: 'H5_Miaosha',
          $title: '秒杀详情'
        })
      },
      querySeckillCouponDetail() { // 查询秒杀券信息
        api.querySeckillCouponDetail({
          memberId: this.memberId,
          actTime: this.actTime,
          skuID: this.skuID
        }).then(res => {
          if (res.body.resCode == "00100000") {
            if (res.body.obj) {
              this.seckillDetailResult = res.body.obj
              if (this.seckillDetailResult.detail) {
                this.allSlides = this.allSlides.concat({"mediaUrl": this.seckillDetailResult.detail.picUrl})
              }
              if (this.seckillDetailResult.flag && this.seckillDetailResult.flag == 1 && this.seckillDetailResult.storeSize != 0) {
                  this.buttonName = '立即领券'
              } else if (this.seckillDetailResult.flag && this.seckillDetailResult.flag == 0) {
                  this.secKillstateNmae = '即将开始'
                  this.buttonName = '即将开抢'
                  this.buttonFlag = true
                  this.timeRemaining = this.seckillDetailResult.startTime - this.seckillDetailResult.sysTime
              } else {
                  this.buttonName = '已领光'
                  this.buttonFlag = true
                  this.secKillstateNmae = '已结束'
                  this.secKillstateFlag = false
              }
              if (this.seckillDetailResult.flag && this.seckillDetailResult.flag == 1) {
                  this.secKillstateNmae = '抢券中'
                  this.secKillstateNmae1 = '(每人限抢一张预约券)'
                  this.timeRemaining = this.seckillDetailResult.endTime - this.seckillDetailResult.sysTime
              }
            } else {
              this.secKillstateNmae = '已结束'
              this.secKillstateFlag = false
            }
          }
        })
      },
      sure () { // 领券成功跳转优惠券
        if (this.mackNextFlag == 1) {
          this.mackNextFlag = '0'
          this.successFlag = true
          var _this = this
          this.msg = '预约券还在飞来的路上！<br>请耐心等待～<br><font class="grey-font">领券可能延迟，可稍后刷新重试</font>'
          var seconds = 5;
          var toMyCouponList = setInterval(function() {
              if (seconds > 1) {
                seconds = seconds - 1;
                _this.time = seconds + "s"
              } else {
                window.location.href = location.origin + "/h5/electroniCard?isCoupon=1";
                this.mackFlag = false
                this.mackNextFlag = '0'
                this.mackBackFlag = false
                clearInterval(toMyCouponList);
              }
            }, 1000);
        } else {
          this.mackFlag = false
        }
      }
    }
  }
</script>
