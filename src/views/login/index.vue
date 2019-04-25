<style scoped lang="scss">
  img {
    height: 46px;
  }
  .forget {
    line-height: 23px;
    color: #222;
    vertical-align: middle;
    float: right;
    margin-right: .2rem;
  }
  .bottom{
    position: fixed;
    bottom: .1rem;
    left: 0;
    right: 0;
  }
</style>

<template>
  <div>
    <v-mobile-head
      :title="title"
      style="border-bottom: #ccc 1px solid"
      :showBackRightbuttons="showBackRightbuttons"
      :isLoginPage="isLoginPage"
    >
    </v-mobile-head>
    <tab
      :line-width="2"
      :active-color="tabColor.activeColor"
      :default-color="tabColor.defaultColor"
      :bar-active-color="tabColor.activeColor"
      v-model="tabIndex"
    >
      <tab-item
        :class="{'vux-1px-r': index===0}"
        @on-item-click="handler"
        v-for="(item, index) in tabs"
        :key="index"
        v-text="item.value"
        :selected="index == 0"
      ></tab-item>
    </tab>

    <group v-if="tabIndex == 0">
      <x-input title="" v-model="account.name" required placeholder="请输入账号"></x-input>
      <x-input type="password" title="" v-model="account.password" required placeholder="请输入密码"></x-input>
      <x-input title="" v-model="account.identifyCode" required placeholder="请输入验证码" :max="account.verify.codeMaxLength">
        <img slot="right-full-height" class="real_pic" :src="account.verify.codeUrl" @click.stop="getVerifyCode"/>
      </x-input>
    </group>
    <template v-if="tabIndex == 0">
      <check-icon :value.sync="NoLandFall">两周内免登陆</check-icon>
      <span class="forget">忘记密码?</span>
    </template>
    
    <group v-else-if="tabIndex == 1">
      <x-input title="" v-model="account.phone" required placeholder="请输入手机号"></x-input>
      <x-input title="" v-model="account.password" required placeholder="请输入短信验证码">
        <x-button slot="right" type="primary" mini @click.native="sendMsg" v-if="canSendFlag" v-text="sendMsgValue"></x-button>
        <x-button slot="right" mini plain v-else v-text="countTime"></x-button>
      </x-input>
    </group>

    <div class="bottom btn">
      <x-button type="warn" :show-loading="loading" action-type="button" @click.native="login">登录</x-button>
    </div>

    <!-- <v-toast :text="toast.text" :canShowToast="toast.canShowToast"></v-toast> -->
  </div>
</template>
<script>
import html2canvas from 'html2canvas'
import api from './api'
import utils from '../../utils'
import {MD5} from '../../md5'

export default {
  data() {
    return {
      title: "登录",
      showBackRightbuttons: true,
      isLoginPage: true,
      tabs: [
        { index: 1, value: "账号密码登录" },
        { index: 2, value: "手机动态密码登录" }
      ],
      tabColor: {
        activeColor: "#d0111a",
        defaultColor: "#444"
      },
      tabIndex: 0,
      account: {
        // 登录账号
        name: '',
        // 登录手机号
        phone: '',
        // 登录密码
        password: '',
        // 短信验证码
        identifyCode: '',
        // 图形验证码相关属性
        verify: {
          codeUrl: '',
          codeKey: '',
          codeMaxLength: 4,
        },
      },
      showCanvas: false,
      // 免登陆
      NoLandFall: false,
      loading: false,
      toast: {
        text: 'loading...',
        canShowToast:false,
      },
      canSendFlag: true,
      countTime: 5,
      clearTime: '',
      sendMsgValue: '发送短信验证码',
    };
  },
  created() {
    let code = '9527'
    // this.drawCode(code)
    this.getVerifyCode()
  },
  methods: {
    login() {
      // 先判断是哪种登录方式
      if (this.tabIndex == 0) {
        console.log("账号密码登录");
        if (this.checkByPwd()) {
          console.log("验证通过调用登录接口")
          let params = {
            name: this.account.name,
            pwd: MD5(this.account.password),
            identifyCode: this.account.identifyCode,
            identifyKey: this.account.verify.codeKey
          }
        }
      } else {
        console.log("短信登录");
      }
    },
    // 登录密码方式校验
    checkByPwd() {
      this.loading = true
      if (this.account.name == null || !utils.isExist(this.account.name)) {
        this.showToast('账户不能为空')
        this.loading = false
        return false
      }
      if (this.account.password == null || !utils.isExist(this.account.password)) {
        this.showToast('密码不能为空')
        this.loading = false
        return false
      }
      if (this.account.identifyCode == null || !utils.isExist(this.account.identifyCode)) {
        this.showToast('验证码不能为空')
        this.loading = false
        return false
      }
      this.loading = false
      return true
    },
    // toast
    showToast(text) {
      this.$vux.toast.show({
        type: 'text',
        position: 'middle',
        text: text || 'Loading...'
      })
    },
    // 倒计时
    countDown() {
      this.canSendFlag = false
      this.countTime = 5
      clearInterval(this.clearTime)
      const that = this
      this.clearTime = setInterval(() => {
        that.countTime --
        if (that.countTime <= 0) {
          that.countTime = 0
          that.canSendFlag = true
          that.sendMsgValue = "重新发送短信验证码"
          clearInterval(that.clearTime)
        }
        console.log(">>>", that.canSendFlag)
      }, 1000)
    },
    hideToast() {
      this.$vux.toast.hide()
    },
    handler(index) {
      console.log(index, 89999, this.clearTime);
      this.tabIndex = index;
      if (this.clearTime) {
        clearInterval(this.clearTime)
      }
    },
    getVerifyCode() {
      api.queryVerifyCode().then(res => {
        console.log(res)
        if (res.body.obj) {
          // this.codeUrl = res.body.obj
          this.account.verify.codeUrl = 'data:image/jpeg;base64,' + res.body.obj.imgBasic64
          this.account.verify.codeKey = res.body.obj.verifyCodeKey
          console.log(77, this.account.verify)
        }
      })
    },
    sendMsg() {
      console.log("发送短信验证码")
      this.countDown()
    }
  }
};
</script>