export default [
  {
    path: '/secKill',
    meta: {
      title: '秒杀列表',
    },
    component: r => require.ensure([], () => r(require('./secKillList')), 'secKillList')
  },
  {
    path: '/secKill/detail',
    meta: {
      title: '秒杀详情',
    },
    component: r => require.ensure([], () => r(require('./secKillDetail')), 'secKillDetail')
  },
]
