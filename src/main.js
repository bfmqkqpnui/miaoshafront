// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import router from './router'
import App from './App'
import bluer from './blur'

Vue.use(bluer)
Vue.use(VueResource)
Vue.use(VueRouter)
FastClick.attach(document.body)
Vue.config.productionTip = false

let H5BASE_URL = '/h5_api'
Vue.H5BASE_URL = Vue.prototype.H5BASE_URL = H5BASE_URL

/* eslint-disable no-new */
new Vue({
  el: '#app-box',
  router,
  render: h => h(App)
})
