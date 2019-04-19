export default [
  {
    path: '/h5/home',
    meta: {
      title: 'H5首页',
    },
    component: r => require.ensure([], () => r(require('./goodsList')), 'home')
  },
  /* {
    path: '/h5/detail',
    meta: {
      title: '秒杀详情',
    },
    component: r => require.ensure([], () => r(require('./secKillDetail')), 'secKillDetail')
  }, */
]