import {XHeader, Tab, TabItem, Group, Cell, XInput, XTextarea, XSwitch, Calendar, XNumber, Radio, XAddress, Datetime, Selector} from 'vux'

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
    
    Vue.component('v-mobile-head', resolve => {
        require(['../components/mobileHeader/header.vue'], resolve)
    })
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default install