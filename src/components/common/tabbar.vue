<template>
  <tabbar style="position: fixed">
      <tabbar-item :link="item.path" v-for="item in items" :key="item.index" :selected="item.index == currentIndex">
        <img slot="icon" :src="item.icon" v-if="item.icon">
        <span slot="label" v-text="item.name"></span>
      </tabbar-item>
    </tabbar>
</template>

<script>
  import {Tabbar, TabbarItem} from 'vux'
  export default {
    props: {
      currentIndex: {
        type: Number,
        default: 1
      }
    },
    data() {
      return {
        items: [
          {index: 1, name: '产品库', icon: '', msgNum: '', path: '/stor'},
          {index: 2, name: '会员管理', icon: '', msgNum: '', path: '/member'},
          {index: 3, name: '订单管理', icon: '', msgNum: '', path: '/order'},
          {index: 4, name: '财务状况', icon: '', msgNum: '', path: '/finance'},
        ]
      }
    },
    components: {Tabbar, TabbarItem}
  }
</script>

<style lang="scss" scoped>

</style>