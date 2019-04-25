export default [
  {
    path: '/stor',
    meta: {
      title: '库存列表',
      wxLogin: true,
      needLogin: false
    },
    component: r => require.ensure([], () => r(require('./author.vue')), 'secKillList')
  },
  {
    path: '/member',
    meta: {
      title: '会员管理',
      wxLogin: true,
      needLogin: false
    },
    component: r => require.ensure([], () => r(require('./item1.vue')), 'member')
  },
  {
    path: '/order',
    meta: {
      title: '订单管理',
      wxLogin: true,
      needLogin: false
    },
    component: r => require.ensure([], () => r(require('./item2.vue')), 'order')
  },
  {
    path: '/finance',
    meta: {
      title: '财务状况',
      wxLogin: true,
      needLogin: false
    },
    component: r => require.ensure([], () => r(require('./item3.vue')), 'finance')
  }
]
