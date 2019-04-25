// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import FastClick from 'fastclick'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import router from './router'
import App from './App'
import bluer from './blur'
import  { ToastPlugin, WechatPlugin } from 'vux'

// 引入全局变量
require('./base')

// 引入mock
require('./mockApi')

Vue.use(bluer)
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(ToastPlugin)
// 使用微信 jssdk
Vue.use(WechatPlugin)
const FastClick = require('fastclick')
FastClick.attach(document.body)
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app-box',
  router,
  render: h => h(App)
})
