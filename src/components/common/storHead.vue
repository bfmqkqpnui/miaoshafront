<template>
  <div>
    <div class="member-head">
      <!----> 
      <div class="head-main">
        <div class="main-pic">
          <div style="background-image: url('http://Img.iblimg.com/bl-iblapp-60/782524094.jpg'); background-size: cover; width: 100%; height: 100%;"></div>
        </div> 
        <!----> 
        <div class="logined">
          <div class="member-tel">蹦啵了霸</div> 
          <div class="core">
            <div>
              <div class="core-gift">有<span>12</span>个未完成订单</div>
            </div>
            <div class="trigle"></div>
          </div>
        </div> 
      </div>
    </div>
  </div>
</template>

<script>
import { Panel, Group, Radio } from 'vux'

  export default {
    data() {
      return {}
    },
    methods: {

    },
    created() {

    },
    components: {
      Panel,
      Group
    },
  }
</script>

<style lang="scss" scoped>
.member-head {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: .2rem 0 .2rem;
  background-image: -webkit-linear-gradient(left,#e83448,#de4040);
  background-image: linear-gradient(90deg,#e83448,#de4040);
  // background: #ccc;
  background-size: 100% 100%;
  .head-main {
    position: relative;
    width: 100%;
    height: 1.2rem;
    padding-left: .4rem;
    .main-pic {
      position: absolute;
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
      overflow: hidden;
      margin-right: .4rem;
      div {
        background-image: url(http://Img.iblimg.com/bl-iblapp-60/782524094.jpg);
        background-size: cover;
        width: 100%;
        height: 100%;
      }
    }
    .logined {
      position: absolute;
      left: 2rem;
      width: 100%;
      -webkit-box-align: center;
      -webkit-align-items: center;
      -moz-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      justify-content: space-between;
      .member-tel {
        font-size: .36rem;
        color: #fff;
        // line-height: .66667rem;
        // margin-bottom: .16rem;
      }
      .core {
        width: 3.2rem;
        height: .42rem;
        border-radius: 1rem 0 0 1rem;
        color: #fff;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        padding-right: .4rem;
        font-size: .24rem;
        text-align: right;
        margin-top: 0.1rem;
        .core-gift {
          span {
            font-size: .36rem;
            color: greenyellow;
          }
        }
        .trigle {
          width: 0;
          height: 0;
          border-top: .10667rem solid transparent;
          border-bottom: .10667rem solid transparent;
          border-left: .13333rem solid #fff;
          margin-left: .26667rem;
          margin-top: .2rem;
        }
      }
    }
  }
}
</style>