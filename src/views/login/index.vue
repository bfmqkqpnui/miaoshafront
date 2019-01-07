<style scoped>
  img {
    height: 46px;
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
      <x-input title="账号" v-model="account.phone" required placeholder="请输入账号"></x-input>
      <x-input title="密码" v-model="account.password" required placeholder="请输入密码"></x-input>
      <x-input title="验证码" v-model="account.password" required placeholder="请输入验证码">
        <div slot="right">
          <div slot="right-full-height"><img src="" alt=""></div>
        </div>
      </x-input>
      <!-- <canvas width="100" height="46" id="verifyCanvas" v-show="showCanvas"></canvas>
      <img id="code_img" :src="codeUrl"> -->
    </group>
    <group v-else-if="tabIndex == 1">
      <x-input title="手机" v-model="account.phone" required placeholder="请输入手机号"></x-input>
      <x-input title="短信" v-model="account.password" required placeholder="请输入短信验证码"></x-input>
    </group>

    <div class="imageWrapper" ref="imageWrapper">
      <img class="real_pic" :src="codeUrl" />
      <slot></slot>
    </div>

  </div>
</template>
<script>
import html2canvas from 'html2canvas'
import api from './api'
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
      tabIndex: 1,
      account: {
        name: '',
        password: ''
      },
      showCanvas: false,
      codeUrl: '',
    };
  },
  created() {
    let code = '9527'
    // this.drawCode(code)
    this.getVerifyCode()
  },
  methods: {
    login() {
      console.log("登录");
    },
    handler(index) {
      console.log(index, 89999);
      this.tabIndex = index;
    },
    getVerifyCode() {
      api.queryVerifyCode().then(res => {
        console.log(res)
      })
    },
    // 绘制验证码
    drawCode (str) {
      // 获取HTML端画布
      let canvas = document.getElementById("verifyCanvas")
      // 获取画布2D上下文 
      let context = canvas.getContext("2d")
      // 画布填充色
      context.fillStyle = "cornflowerblue"
      // 清空画布
      context.fillRect(0, 0, canvas.width, canvas.height)
      //设置字体颜色
      context.fillStyle = "white"
      //设置字体
      context.font = "25px Arial"
      let rand = new Array();
      let x = new Array();
      let y = new Array();
      for (let i = 0; i < 4; i++) {
          rand.push(rand[i]);
          rand[i] = nums[Math.floor(Math.random() * nums.length)]
          x[i] = i * 20 + 10;
          y[i] = Math.random() * 20 + 20;
          context.fillText(rand[i], x[i], y[i]);
      }
      str = rand.join('').toUpperCase();
      //画3条随机线
      for (let i = 0; i < 3; i++) {
          this.drawline(canvas, context);
      }

      // 画30个随机点
      for (let i = 0; i < 30; i++) {
          this.drawDot(canvas, context);
      }
      this.convertCanvasToImage(canvas);
      return str;
    },
    // 绘制图片
    convertCanvasToImage (canvas) {
      // document.getElementById("verifyCanvas").style.display = "none";
      // let image = document.getElementById("code_img");
      this.codeUrl = canvas.toDataURL("image/png");
    },
    // 随机线
    drawline (canvas, context) {
      // 随机线的起点x坐标是画布x坐标0位置，y坐标是画布高度的随机数
      context.moveTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height))
      // 随机线的终点x坐标是画布宽度，y坐标是画布高度的随机数
      context.lineTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height))
      //随机线宽
      context.lineWidth = 0.5
      //随机线描边属性
      context.strokeStyle = 'rgba(50,50,50,0.3)'
      //描边，即起点描到终点
      context.stroke()
    },
    // 随机点(所谓画点其实就是画1px像素的线)
    drawDot (canvas, context) {
      let px = Math.floor(Math.random() * canvas.width);
      let py = Math.floor(Math.random() * canvas.height);
      context.moveTo(px, py);
      context.lineTo(px + 1, py + 1);
      context.lineWidth = 0.2;
      context.stroke();
    },
  }
};
</script>