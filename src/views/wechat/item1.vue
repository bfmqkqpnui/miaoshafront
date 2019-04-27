<template>
  <div>
    item1
    <v-tab-bar :currentIndex="2"></v-tab-bar>
  </div>
</template>

<script>
import utils from '../../utils.js'
  export default {
    data() {
      return {}
    },
    created() {
      
    },
    mounted() {
      utils.getLocation().then(res => {
        alert("定位成功：" + JSON.stringify(res))
        console.log("定位成功：", JSON.stringify(res))
      }).catch(e => {
        alert("定位失败：" + JSON.stringify(e))
        console.log("定位失败：", JSON.stringify(e))
      })
    }
  }
</script>

<style lang="scss" scoped>

</style>