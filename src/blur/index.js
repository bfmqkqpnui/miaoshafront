import {XHeader, Tab, TabItem, Group, Cell, XInput, XTextarea, XSwitch, Calendar, XNumber, Radio, XAddress, Datetime, Selector, CheckIcon, XButton, Toast} from 'vux'

const install = function (Vue) {
    if (install.installed) return;

    Vue.component('x-header', XHeader)
    Vue.component('tab', Tab)
    Vue.component('tab-item', TabItem)
    Vue.component('Group', Group)
    Vue.component('XInput', XInput)
    Vue.component('Cell', Cell)
    Vue.component('XTextarea', XTextarea)
    Vue.component('Calendar', Calendar)
    Vue.component('XSwitch', XSwitch)
    Vue.component('XNumber', XNumber)
    Vue.component('Radio', Radio)
    Vue.component('XAddress', XAddress)
    Vue.component('Datetime', Datetime)
    Vue.component('Selector', Selector)
    Vue.component('check-icon', CheckIcon)
    Vue.component('XButton', XButton)
    Vue.component('Toast', Toast)
    
    Vue.component('v-mobile-head', resolve => {
        require(['../components/mobileHeader/header.vue'], resolve)
    })

    // 图形验证码
    Vue.component('v-identify', resolve => {
      require(['../components/identify/identify.vue'], resolve)
    })
    // toast
    Vue.component('v-toast', resolve => {
      require(['../components/common/toast.vue'], resolve)
    })
    // 轮播
    Vue.component('v-slide', resolve => {
      require(['../components/slide/index.vue'], resolve)
    })

    // 底部菜单
    Vue.component('v-tab-bar', resolve => {
      require(['../components/common/tabbar.vue'], resolve)
    })

    // 顶部个人中心
    Vue.component('v-member-center', resolve => {
      require(['../components/common/storHead.vue'], resolve)
    })
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default install