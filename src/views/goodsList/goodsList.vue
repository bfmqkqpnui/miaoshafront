<style lang="scss" src="./css/goodsList.scss" scoped></style>
<template>
  <div>
    <div>
      <!-- 头部导航 -->
      <v-mobile-head :title="title" style="border-bottom: #ccc 1px solid" :showBackRightbuttons="true"><img slot="btn-right" src="./img/icon_left@2x.png"/></v-mobile-head>
    </div>
  </div>
</template>

<script>
  import api from './api/index'
  import utils from '../../utils'
  export default {
    data () {
      return {
        title: '首页',
      }
    },
    computed: {},
    methods: {
      
    },
    created() {
    },
  }
</script>

