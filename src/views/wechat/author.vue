<style lang="scss" src="./css/seckill.scss" scoped></style>
<template>
  <div id="seckill">
    <div class="content">
      <!-- 头部导航 -->
      <!-- <v-mobile-head :title="title" style="border-bottom: #ccc 1px solid" :showBackRightbuttons="true"><a slot="btn-right" @click.stop="toggleActivityuleRule('show')">活动规则</a></v-mobile-head> -->
    </div>
    <template>
      <!-- 秒杀列表 -->
      <div class="kill-list">
        <ul>
          <li v-for="(item, index) in couponList" :key="index" @click.stop="grabTickets(itemG)">
            <div class="kill-box">
              <div class="kill-img">
                <img :src="item.productImg" />
              </div>
              <div class="kill-name">
                <div><span>产品编号：</span><span v-text="item.productId"></span></div>
                <div><span>产品名称：</span><span v-text="item.productName"></span></div>
                <div><span>证书号：</span><span v-text="item.certificateId"></span></div>
                <div><span>库存：</span><span v-text="item.stor"></span></div>
                <div><span>所属门店：</span><span v-text="item.storeName"></span></div>
              </div>
              <div class="kill-price">
                <div class="kill-button-box">
                  <div class="kill-button">
                    查看详情
                  </div>
                </div>
              </div>
            </div>
          </li>
          

          <!-- <li @click.stop="grabTickets">
            <div class="kill-box">
              <div class="kill-img">
                <img src="./img/footprint1.jpg" />
              </div>
              <div class="kill-name">
                <div><span>产品名称：</span><span></span></div>
                <div><span>产品编号：</span><span></span></div>
                <div><span>证书号：</span><span></span></div>
                <div><span>库存：</span><span></span></div>
                <div><span>所属门店：</span><span></span></div>
              </div>
              <div class="kill-price">
                <div class="kill-button-box">
                  <div class="kill-button">
                    查看详情
                  </div>
                </div>
              </div>
            </div>
          </li> -->

          <!-- <li @click.stop="grabTickets">
            <div class="kill-box">
              <div class="kill-img">
                <img src="./img/footprint1.jpg">
                <div class="kill-logo">秒杀</div>
                <div class="out-img">
                  <img src="./img/out-img.png"/>
                </div>
              </div>
              <div class="kill-name"><span v-text="brandTitle" style='color:red'></span> 百事可乐220ml</div>
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
          </li> -->
        </ul>
      </div>
      <!-- 列表结尾 -->
      <div class="bottom-end" v-if="isEnd">
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
    <v-tab-bar :currentIndex="1"></v-tab-bar>
  </div>
</template>

<script>
  import api from './api/index'
  import utils from '../../utils'
  export default {
    data () {
      return {
        title: '库存列表',
        couponList: [],
        isEnd: false,
      }
    },
    computed: {},
    methods: {
      // 查询库存列表
      querySeckillCouponList() {
        console.log("查询库存列表")
        api.mockQueryAll().then(res => {
          console.log("查询库存列表结果：", res)
          if (res.body.resCode == "00100000") {
            this.couponList = res.body.data
            this.isEnd = true
          }
        })
      },
    },
    created() {
      // 查询秒杀资格
      this.querySeckillCouponList()
    },
    filters: {
    },
    components: {}
  }
</script>
