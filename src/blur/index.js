import { XHeader, Tab, TabItem } from 'vux'

const install = function (Vue) {
    if (install.installed) return;

    Vue.component('x-header', XHeader)
    Vue.component('tab', Tab)
    Vue.component('tab-item', TabItem)

    Vue.component('v-mobile-head', resolve => {
        require(['../components/mobileHeader/header.vue'], resolve)
    })
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default install