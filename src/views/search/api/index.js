import Vue from 'vue'

export default {
  // 搜索
  search: () => {
    return Vue.http.get(Vue.H5BASE_URL + '/user/getVerifyCode?timeSimple=' + new Date().getTime())
  }
}