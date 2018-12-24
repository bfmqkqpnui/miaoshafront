<template>
  <div class="vux-header">
    <v-mobile-head
      :title="title"
      style="border-bottom: #ccc 1px solid"
      :showBackRightbuttons="showBackRightbuttons"
      :isLoginPage="isLoginPage"
    >
    </v-mobile-head>
    <tab
      :line-width="2"
      :active-color="tabColor.activeColor"
      :default-color="tabColor.defaultColor"
      :bar-active-color="tabColor.activeColor"
      v-model="tabIndex"
    >
      <tab-item
        :class="{'vux-1px-r': index===0}"
        @on-item-click="handler"
        v-for="(item, index) in tabs"
        :key="index"
        v-text="item.value"
        :selected="index == 0"
      ></tab-item>
    </tab>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "登录",
      showBackRightbuttons: true,
      isLoginPage: true,
      tabs: [
        { index: 1, value: "账号密码登录" },
        { index: 2, value: "手机动态密码登录" }
      ],
      tabColor: {
        activeColor: "#d0111a",
        defaultColor: "#444"
      },
      tabIndex: 1
    };
  },
  methods: {
    login() {
      console.log("登录");
    },
    handler(index) {
      console.log(index, 89999);
      this.tabIndex = index;
    }
  }
};
</script>