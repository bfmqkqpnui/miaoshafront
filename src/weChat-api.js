import Vue from 'vue'

export default function () {
  // 默认分享的内容
  let _shareData = {
    title: document.title,
    desc: 'i分享，爱生活',
    link: window.location.href,
    imgUrl: location.origin + '/static/img/bl.png',
    type: "",
    dataUrl: "",
    success: function (res) {
    },
    cancel: function (res) {
    }
  }
  let rand = num => {
    let length = num
    let res = ''
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    for (let i = 0; i < length; ++i) {
      res += chars.charAt(parseInt(chars.length * Math.random()))
    }
    return res;
  }
  let queryParam = {
    rid: "b8bd898a9fbc49309f0891adb5e4146c",
    userid: "beyond",
    password: "123"
  }
  let host = location.host;
  if (host.indexOf("mh5.bl.com") != -1) {
    queryParam = {
      rid: "cf40bc28839147258b5b4b6dd0f4322e",
      userid: "h5",
      password: "passh5wd"
    }
  }
  let sign = (json) => {
    // 时间戳
    var timestamp_val = Math.floor(new Date().getTime() / 1000);
    // 随机数
    var nonceStr_val = rand(16);
    var url_total = window.location.href;
    var string1 = "jsapi_ticket=" + json.data.js_token + "&noncestr=" + nonceStr_val + "&" + "timestamp=" + timestamp_val + "&url=" + url_total
    var signature_val = window.sha1(string1);
    let jsApiList_val = ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage',
      'onMenuShareQQ', 'onMenuShareWeibo', 'startRecord', 'stopRecord',
      'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice',
      'onVoicePlayEnd', 'uploadVoice', 'downloadVoice', 'chooseImage',
      'previewImage', 'uploadImage', 'downloadImage', 'translateVoice',
      'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu',
      'showOptionMenu', 'hideMenuItems', 'showMenuItems',
      'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'closeWindow',
      'scanQRCode', 'chooseWXPay', 'openProductSpecificView', 'addCard',
      'chooseCard', 'openCard' ];
    window.wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: json.data.appid, // 必填，公众号的唯一标识
      timestamp: timestamp_val, // 必填，生成签名的时间戳
      nonceStr: nonceStr_val, // 必填，生成签名的随机串
      signature: signature_val, // 必填，签名，见附录1
      jsApiList: jsApiList_val
      // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    })
  }
  // 获取ticketId, appid
  Vue.http.post('/h5_gateway/weChatOpen/getWechatAccount.htm', queryParam).then((result) => {
    let json = {}
    if (result.body.resCode == "00100000") {
      json = JSON.parse(result.body.obj)
      console.log(json)
    }
    localStorage.setItem("jsapi_appid", json.data.appid)
    localStorage.setItem("jsapi_ticket", json.data.js_token)
    sign(json) // 进行config 注入
  }, (result) => {
  })
  window.initShare = shareInfo => {
    let appId = localStorage.getItem("jsapi_appid")
    let jsToken = localStorage.getItem("jsapi_ticket")
    let json = {
      data: {}
    }
    json.data.appid = appId
    json.data.js_token = jsToken
    sign(json)
    let shareData = shareInfo || _shareData;
    if (shareData.imgUrl && shareData.imgUrl.indexOf('http') == -1) {
      shareData.imgUrl = 'http:' + shareData.imgUrl
    }
    window.wx.ready(() => {
      window.wx.onMenuShareTimeline({
          title: shareData.useDesc ? shareData.desc : shareData.title,
          link: shareData.timelineLink ? shareData.timelineLink : shareData.link,
          imgUrl: shareData.imgUrl,
          success: shareData.success,
          cancel: shareData.cancel
      });
      window.wx.onMenuShareAppMessage({
          title: shareData.title,
          desc: shareData.desc,
          link: shareData.link,
          imgUrl: shareData.imgUrl,
          type: shareData.type,
          dataUrl: shareData.dataUrl,
        success: shareData.success,
          cancel: shareData.cancel
      });
      window.wx.onMenuShareQQ({
          title: shareData.title,
          desc: shareData.desc,
          link: shareData.link,
          imgUrl: shareData.imgUrl,
          success: function(res) {
              if (shareData.success) {
                  shareData.success(res, "qqzone"); // 表明是分享到QQ空间
              }
          },
          cancel: shareData.cancel
      });
      window.wx.onMenuShareWeibo({
          title: shareData.title,
          desc: shareData.desc,
          link: shareData.link,
          imgUrl: shareData.imgUrl,
          success: function (res) {
              if (shareData.success) {
                  shareData.success(res, "weibo"); // 表明是分享到weibo
              }
          },
          cancel: shareData.cancel
      });
    });
  };
  if (_shareData) {
    window.initShare()
  }
};
