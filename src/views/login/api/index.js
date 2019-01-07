import Vue from 'vue'

export default {
  // 获取图片验证码
  queryVerifyCode: () => {
    return Vue.http.get(this.H5BASE_URL + '/user/getVerifyCode?timeSimple=' + new Date().getTime())
  }
}