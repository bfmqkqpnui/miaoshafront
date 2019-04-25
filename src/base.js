import Vue from 'vue'

let APPID = 'wxaa70964d4443aa1f'
let APPSECRET = '980860659430f5e4240502db684f3523'
let API_URL = '/h5_api'

let u = navigator.userAgent;
let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
isAndroid ? Vue.$ISANDROID = Vue.prototype.$ISANDROID = true : Vue.$ISANDROID = Vue.prototype.$ISANDROID = true
isiOS ? Vue.$ISIOS = Vue.prototype.$ISIOS = true : Vue.$ISIOS = Vue.prototype.$ISIOS = true
// 是否在微信中
if (navigator.userAgent.toLowerCase().indexOf('micromessenger') >= 0) {
  Vue.$ISWECHAT = Vue.prototype.$ISWECHAT = true
} else {
  Vue.$ISWECHAT = Vue.prototype.$ISWECHAT = false
}

Vue.$APPID = Vue.prototype.$APPID = APPID
Vue.$APPSECRET = Vue.prototype.$APPSECRET = APPSECRET
Vue.$API_URL = Vue.prototype.$API_URL = API_URL