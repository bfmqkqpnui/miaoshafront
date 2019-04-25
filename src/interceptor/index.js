import router from '../router'

const wxAuthor = scope => {
  // appid
  let appid = Vue.$APP_ID
  // 静默授权
  // let scope = 'snsapi_base'  snsapi_userinfo
  location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + encodeURIComponent(location.href) + '&response_type=code&scope=' + scope + '&state=' + scope + '#wechat_redirect'
}

router.beforeEach(({ meta, path, fullPath, query }, from, next) => {
  if (meta.title) {
    document.title = meta.title
  }
  if (navigator.userAgent.toLowerCase().indexOf('micromessenger') >= 0) {
    if (meta.wxLogin) {
      require.ensure([], function (require) {
        let weixinConfig = require('../weChat-api').default
        weixinConfig()
      })
    }
  } else {
    return next();
  }
})