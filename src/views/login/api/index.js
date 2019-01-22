import Vue from 'vue'

export default {
  // 获取图片验证码
  queryVerifyCode: () => {
    return Vue.http.get(Vue.H5BASE_URL + '/user/getVerifyCode?timeSimple=' + new Date().getTime())
  },
  // 通过账号密码登录
  loginByPwd: params => {
    return Vue.http.post(Vue.H5BASE_URL + '/user/getVerifyCode?timeSimple=', params)
  }
}