import Vue from 'vue'

export default {
  // 查询秒杀列表数据
  querySecKillCouponListData: params => {
    return Vue.http.post('/h5_seckill/app/store', params)
  },
  // 获取当前系统时间
  queryServiceTime: () => {
    return Vue.http.get(Vue.$SERVICE_BASE_URL + '/weixin/common/querySystemTime.htm')
  },
  // 校验是否有秒杀资格
  querySeckillQualifications: params => {
    return Vue.http.post('/h5_seckill/image/isMemberValid', params)
  },
  querySeckillCouponDetail: params => {
    return Vue.http.post('/h5_seckill/app/setr', params)
  },
  // mock列表数据
  mockQueryAll: params => {
    return Vue.http.post('/stor/queryAll.htm', params)
  }
}