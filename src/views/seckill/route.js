export default [
  {
    path: '/secKill',
    meta: {
      title: '秒杀列表',
    },
    component: r => require.ensure([], () => r(require('./secKillList')), 'secKillList')
  },
]
