import Vue from 'vue'

export default {
  // 搜索
  search: params => {
    return Vue.http.post('', params)
  }
}