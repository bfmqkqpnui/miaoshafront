<template>
  <div>
    <x-header
      :left-options="{backText: backText, showBack: showBack, preventGoBack: preventGoBack}"
      :title="title"
      :right-options="{showBack: showBackRightbuttons}"
    >
    <a v-if="isLoginPage"
        slot="right"
        style="color:#d0111a"
      >注册</a>
    </x-header>
  </div>
</template>
<script>
export default {
  props: {
    // 导航头部标题
    backText: {
      type: String,
      default: ""
    },
    // 是否阻止返回
    preventGoBack: {
      type: Boolean,
      default: true
    },
    // 是否显示返回文字
    showBack: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ""
    },
    // 导航右侧按钮是否显示
    showBackRightbuttons: {
      type: Boolean,
      default: false
    },
    headerButtons: {
      type: String,
      default: "菜单"
    },
    isLoginPage: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  }
};
</script>
<style scoped>
  a {
    font-size: 18px;
  }
</style>