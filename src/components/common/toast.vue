<template>
  <div>
    <toast v-model = "canShowToastValue" :text = "text" :time = "time" :type = "type" :is-show-mask = "isShowMask" :position = "position"></toast>
  </div>
</template>

<script>
export default {
  props: {
    // 是否展示
    canShowToast: {
      type: Boolean,
      default: false,
    },
    // 内容
    text: {
      type: String,
      default: 'loading...'
    },
    // 时间
    time: {
      type: Number,
      default: 2000
    },
    // 类型
    type: {
      type: String,
      default: 'text'
    },
    // 是否有蒙层
    isShowMask: {
      type: Boolean,
      default: false
    },
    // 位置
    position: {
      type: String,
      default: 'middle'
    }
  },
  data() {
    return {
      canShowToastValue: this.canShowToast
    }
  },
  methods: {
  }
}
</script>
