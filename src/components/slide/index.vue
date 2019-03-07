<template>
  <div class="swiper-container" ref="slide" v-show="slides.length >= 1">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-if="slides.length > 1" v-for="(item, index) in slides" :key="index" v-go-native-resource="item">
        <a href="javascript:;" v-if="item.mediaUrl">
          <video v-if="item.attrType == 2" :src="(item.videoLink || '').replace(/^http:/, '')" :poster="(item.mediaUrl || '').replace(/^http:/, '')" :alt="item.deployName" controls="controls"></video>
          <img v-else :_src="(item.mediaUrl || '').replace(/^http:/, '')" :alt="item.deployName">
        </a>
      </div>
      <div class="swiper-slide" v-else v-go-native-resource="item">
        <a href="javascript:;" v-if="item.mediaUrl">
         <video v-if="item.attrType == 2" :src="(item.videoLink || '').replace(/^http:/, '')" :poster="(item.mediaUrl || '').replace(/^http:/, '')" :alt="item.deployName" controls="controls"></video>
         <img v-else :src="(item.mediaUrl || '').replace(/^http:/, '')" :alt="item.deployName">
        </a>
      </div>
    </div>
    <div class="swiper-pagination" v-if="pagination">
      <ul></ul>
    </div>
    <div class="adv" v-show="ad">广告</div>
  </div>
</template>

<script>
export default {

  name: 'Slide',

  props: {
    pagination: {
      type: Boolean,
      default: true
    },
    effect: {
      type: String,
      default: 'leftLoop'
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    slides: {
      type: [Array],
      default: () => {
        return []
      }
    },
    ad: {
      type: Boolean,
      default: false
    },
  },
  watch: {
    slides: {
      handler(items) {
        if (items.length > 1) {
          this.reInitPages()
        }
      },
      immediate: true
    }
  },
  methods: {
    /* init */
    reInitPages() {
      this.$nextTick(() => {
        require.ensure([], require => {
          let TouchSlide = require('./TouchSlide').default;
          TouchSlide({
            slideCell: this.$refs.slide,
            titCell: this.pagination ? this.$refs.slide.getElementsByClassName('swiper-pagination')[0].getElementsByTagName('ul') : false,
            mainCell: this.$refs.slide.getElementsByClassName('swiper-wrapper'),
            effect: this.effect,
            autoPlay: this.autoPlay,
            delayTime: 400,
            interTime: 2000,
            autoPage: this.pagination,
            switchLoad: "_src"
          })
        }, 'TouchSlide');
      });
    }
  }
}
</script>

<style lang="scss">
  .swiper-container{
    position: relative;
    width: 100%;
    overflow: hidden;
    height: auto;
    background: #fff url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAA8CAQAAABh/kp0AAAE00lEQVRYw7WYf0yVZRTHH7h4iUI0569AN5Xrllas5hRWAZVSf9BWTpNi5NBNagklY1GbLrNa0khx+kf9wVgtRLNAYibaMsXSmUuN2lIrHYqEE0X4+COB9963P7jAfe97nve+1m3nT76Hz3vOc55zznMVCsVE1tLMIb7mNcagommmMpWpFIp0TmEQIEAAg0Ok/h+YVP4igDlsAfaTHH3MZvwhEBMTP3nERRvzmyWWQfucSdHGXLVBTODBaGNOCNGYFEYrbUOYDbazMTGpZnx0MekYAqaL2dHFeDVpWxqdtI1cz7cZEDBbmax1TiGLZ8mngCU8RRrxbjD30ydgenlIcMumgn38QQcX6aKLS3RyjlbqWMlUZ4yHH8UyKGJUiEM8K2ihneuC0mSAbk5SzcN6jKJcjGcnKcNyH1/QJQJCrY82aknTYXz0Ck7XSQ+KE6gRz0+O61delTGxHBPTtoxYFIpFdLiEDNplqhltxyjeEdM2VG1V4kc4WT8Ng5PLirlPTNtVMlAoam8TMjhQduANx+iq7SU8KCrFThH5lLaEYxRv8rcgbSAFxWO0/QuMCawIx/i4LF7STBTxvCf8zeBmRFAbKVZMDPvE1JTiRTGZ1cMRBTjA+xSRSw55lFHNOQfQZitGUSze8N1MR6G4k0coZRPvsoRZJIT4TSCbLdzQYK4ww4rx0S3mNzNEMxqv2CLHUsgZDajCivFwWKy2YpcjIY9OEXOORKuwnGuCrFHuvTbzUCJiDJ60ClO5KMi6edzlEJvAN4K/n8pw4bditZVZRoJTPC+I/WB3uLAEBGFzsNoi22zhfAIcs49f6Q70kOsSk8weAfOnXdg4PFkCGAxgYGCyjjtcYSaxVfjMdrtwJT3B+higHwODfkz2unwnuMbMpC0I8QcXqwAml1jgMmnN7pKmaMaPYdvdyl1d0nu5IGCOS9ISeoMxhNp+fBEhsSwUC3qPJJ7KKXFrWRERczf14vXcKMu3iXvMER6IEMtysSf6yZUdCsURZ7LN8bm4kPOiVztjdPXSqmnqn2kiSuR5ftf4bLAOglDbRL/G6SgFTA/ub0MzaB7rg7dN2o5m6jFzOO0weJtYxTNkk0kO+XygjcPE5KPwIW21deKCGGo3QBvzyLkkO2PGsuu2d037Fr4qfIGy2zx+/k8QP5/a10HJCjjAXmrZym5+0R5yqF3gCF+xnQZaqGecO4zCg4c4PCimUMpRx+fHFerJ5S5iiMMz9FCMjBnFdBazkSYaqWI+SUxju3Yfa+MVFDN4mRp2UcdqMpgUGZPAc5yw/KPDZODlY26JycojhjLLZhSgDp8zxsNy4bvP8yjjhYlyi7dQfCjgjzPRCTNXXKVMfiCJxbbb0kIiT2vbU5we84n2sIuZyJd00QNcA7rppJx4cUMbtDk6jJeftE71TCCRHIp4nTdYRT5pKLLE19HgTlGhw6RxVov53vogD9pSrd5ghx5zRuvWIo6CFx0w23WYJI5r3XaKi/sC7VkOUKkvgRrNo9bPWlHv4zsN5iZZesx8zekcZa6oj6FQ/LABmpy7wBrb2y1ADwVa/T3U2UB+zjItUk9bRgf+4M/gAfy0scixzY6jCiPEo48DzHbToWexnoOc5BQHWcOUiHualyeo4xinaaWRpSO/cvwDmqX0iZnY9JIAAAAASUVORK5CYII=') no-repeat center;
    background-size: .4rem;
  }
  .swiper-wrapper{
    height: 100%;
  }
  .swiper-slide{
    & + &{
      display: none;
    }
    a{
      display: block;
    }
   }
  .swiper-pagination{
    position: absolute;
    bottom: .16rem;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    li {
        display: inline-block;
        width: .14rem;
        height: .14rem;
        border-radius: 20px;
        text-indent: -9999px;
        overflow: hidden;
        margin: 0 .08rem;
        background-color: #fff;
        &.on{
          background-color: #ec4b6a;
        }
    }

  }

  /* 闪购首页轮播图 */
  .flash-swipe {
    height: 3.5rem;
    .swiper-pagination li {
      background-color: rgba(#fff, .5);
      width: .12rem;
      height: .12rem;
      border: 0;
      &.on {
        background-color: #C18800;
      }
    }
  }

  /* 电器城 */
  .electric-swipe{
    height: 2.8rem;
    .swiper-pagination li {
      background-color: #3b81cb;
      border-color: #3b81cb;
      opacity: .8;
      width: .16rem;
      height: .16rem;
      border: 0;
      &.on {
        background-color: #fff;
      }
    }
  }

  /* 必买清单 */
  .mustbuy-swipe {
    .swiper-pagination li {
      background-color: #000;
      border:1px solid #000;
      width: .12rem;
      height: .12rem;
      &.on {
        background-color: #fff;
      }
    }
  }

  /* 店铺首页 */
  .shop-swipe {
    .swiper-pagination li {
      background-color: #000;
      opacity: .3;
      width: .1rem;
      height: .1rem;
      border:1px solid #000;
      &.on {
        background-color: #fff;
      }
    }
  }

  /* 广告标签 */
  .adv {
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: .2rem;
    text-align: center;
    height: .34rem;
    width: .68rem;
    background: rgba(0, 0, 0, 0.7);;
    z-index: 9000;
    color: #fff;
  }
</style>
