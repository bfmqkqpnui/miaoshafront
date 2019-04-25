<template>
  <div id="app">
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
@import '~vux/src/styles/1px.less';

body {
  background-color: #f8f8f8;
  font-size: .24rem;
}
</style>
