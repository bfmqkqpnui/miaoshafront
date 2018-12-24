export default [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        meta: {
            title: '登录',
        },
        component: r => require.ensure([], () => r(require('./index')), 'login')
    }
]