export default [
    {
        path: '/search',
        meta: {
            title: '搜索',
        },
        component: r => require.ensure([], () => r(require('./search')), 'search')
    }
]