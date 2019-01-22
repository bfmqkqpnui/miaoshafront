<template>
  <div class="searchPage">
    <div class="searchInput">
      <div class="inputContainer">
        <div class="logo"></div>
        <input type="text" v-model="thinkKeyword" class="searchKeyWord" id="searchKeyWord" :placeholder="placeholderKey" @keyup="getKeyup(thinkKeyword)" @keydown.enter="getKeydown(thinkKeyword)">
      </div>
      <div class="cancelSearch" @click="goSearch">取消</div>
    </div>
    <div class="serachLable">
      <div class="serachLable-tit">
        <h3 class="iconNear">最近搜索</h3>
        <div v-if="historySearchArry.length" class="iconDelete" @click="clearSearchHistory()"></div>
      </div>
      <div class="labelList">
        <ul id="searchHistory">
          <li  v-for="(item, index) in historySearchArry" :key="index" @click="searchTap(item)">{{item}}</li>
          <div v-if="!historySearchArry.length" class="noLabel">无搜索历史</div>
        </ul>
      </div>
    </div>

    <div class="serachLable">
      <div class="serachLable-tit">
        <h3 class="iconHot">热门搜索</h3>
      </div>
      <div class="labelList">
        <ul id="searchHot">
          <li v-for="(item, index) in hotSearchArry" :key="index" @click="searchTap(item.keyword)">{{item.keyword}}</li>
        </ul>
      </div>
    </div>
    <div class="searchLink" v-if="!!thinkSearchArry.length">
      <ul>
        <li v-for="(item, index) in thinkSearchArry" :key="index" @click="searchTap(item.showKeyWord)">
          <span class="searchName">{{item.showKeyWord}}</span>
          <span class="searchNum">共有{{item.rowCount}}个结果</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from './api'
import utils from '../../utils'
export default {
  name: 'search',
  components: {
    redPack: redPack
  },
  data () {
    return {
      // 展示红包弹层
      showRedBag: false, 
      redbagPro: {},
    	resource: '',
    	channel: [],
    	memberId: '',
      hotSearchArry: [],
      historySearchArry: [],
      thinkSearchArry: [],
      thinkKeyword: '',
      placeholderKey: this.$route.query.key || '搜索热门商品'
    }
  },
  beforeCreate() {
  },
  created() {
    // 最近搜索词
    this.historySearchArry = this.getSearchHistory()
    // 热搜词
    this.getHotWord();
    // 登录回跳过来  重新打开
    if (this.$route.query && this.$route.query.key) {
      // 红包搜索
      let redpag = {
        channelSid: '2',
        k: this.$route.query.key,
        isMatch: '1',
        picNorms: '10003',
        redbagSw: '1', // 开启口令红包
        searchInfo: {
          pageModel: {}
        }
      }
      let resData = {
        clientIp: '127.0.0.1',
        systemNo: '06',
        clientRequestTime: utils.getTimeFormatToday(), // 时间错
        requestData: JSON.stringify(redpag)
      }
      api.keyWordSearchGood(resData)
      .then((data) => {
        if (data.body.obj) {
          let resData = JSON.parse(data.body.obj)
          console.log("结果1", resData)
          if (resData.resultCode == "redbag") {
            this.redbagPro = resData.resultInfo
            // 失去焦点
            document.querySelector("#searchKeyWord").blur()
          }
        }
      });
    }
  },
  methods: {
    closeRed(val) {
      this.showRedBag = val;
    },
    goSearch() {
      this.$router.push({path: 'searchGoodsList'})
    },
    getThinkWord(keyword) {
      let obj = {
        "keyWord": keyword,
        "channel": "2", // 渠道号
        "count": "10"
      }
      obj = JSON.stringify(obj)
      api.queryThinkWord({
        "clientIp": "127.0.0.1 ",
        "clientRequestTime": new Date().getTime(), // yyyyMMddHHmmss
        "systemNo": "06",
        "requestData": obj
      }).then(res => {
        if (res.body.obj) {
          let resData = JSON.parse(res.body.obj)
          this.thinkSearchArry = resData.resultInfo.showKeywords || []
          console.log(resData);
        }
      })
    },
    getHotWord() {
      api.queryHotWord({
        chan: "2", // 渠道号
        pageType: "search",
        num: 10
      }).then(res => {
        if (res.body.obj) {
          let resData = JSON.parse(res.body.obj);
          this.hotSearchArry = resData.wordList;
          console.log(resData);
        }
      })
    },
    searchTap(key) {
      // 点击搜索词搜索
      let bl_ad = "H668822-_-" + key + "-_-5";
      this.setSearchHistory(key);
      console.log(bl_ad)
      // let url = this.$H5BASE_URL + "/search/productList.html?bl_ad=" + bl_ad + '&keyWord=' + key;
      // 泡泡 修改
      // 红包搜索
      let redpag = {
        channelSid: '2',
        k: key,
        isMatch: '1',
        picNorms: '10003',
        redbagSw: '1', // 开启口令红包
        searchInfo: {
          pageModel: {}
        }
      }
      let resData = {
        clientIp: '127.0.0.1',
        systemNo: '06',
        clientRequestTime: utils.getTimeFormatToday(), // 时间错
        requestData: JSON.stringify(redpag)
      }
      api.keyWordSearchGood(resData)
      .then((data) => {
        if (data.body.obj) {
          let resData = JSON.parse(data.body.obj)
          console.log("结果1", resData)
          if (resData.resultCode == "redbag") {
            this.showRedBag = true
            this.redbagPro = resData.resultInfo
            // 失去焦点
            document.querySelector("#searchKeyWord").blur()
          } else {
            let url = location.origin + "/h5/searchGoodsList?bl_ad=" + bl_ad + '&keyWord=' + key;
            window.location.replace(url)
          }
        } else {
          let url = location.origin + "/h5/searchGoodsList?bl_ad=" + bl_ad + '&keyWord=' + key;
          window.location.replace(url)
        }
      });
    },
    getKeyup(keyword) {
      if (keyword != "") {
        // 加载关键字自动补充
        this.getThinkWord(keyword);
      } else {
        this.thinkSearchArry = [];
      }
    },
    getKeydown(keyword) {
      // 键盘回车搜索
      if (keyword == "" || keyword == undefined) {
        keyword = this.placeholderKey;
        this.thinkKeyword = keyword // $("#searchKeyWord").val(a);
      }
      this.searchTap(keyword)
    },
    setSearchHistory(keyword) {
      let oldSearch = [];
      if (keyword.length > 15) {
        return;
      }
      if (keyword != null && keyword != "") {
        oldSearch = this.getSearchHistory();
        if (oldSearch) {
          let indx = oldSearch.indexOf(keyword);
          if (indx == -1) {
            // 当前的缓存数量等于最大数量 删除最早数据，添入最新数据
            if (oldSearch.length == 15) {
              oldSearch.pop();
            }
            oldSearch.unshift(keyword);
          } else {
            oldSearch.splice(indx, 1);
            oldSearch.unshift(keyword);
          }
        } else {
          oldSearch.push(keyword);
        }
        utils.dbSet('SEARCHHISTORY', oldSearch)
      } else {
        return false;
      }
    },
    getSearchHistory() {
      return JSON.parse(utils.dbGet('SEARCHHISTORY') || '[]')
    },
    clearSearchHistory() {
      utils.dbRemove('SEARCHHISTORY');
      this.historySearchArry = [];
    },
  },
  mounted() {
  },
  destroyed () {
  }
}
</script>
<style lang="scss" scoped>
.searchPage {
  background: #fff;
  .searchInput{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    height: .9rem;
    background-position: bottom;
    background-repeat: no-repeat;
    background-origin: content-box;
    background-size: 100% .01rem;
    background-image: -webkit-linear-gradient(bottom, #ddd, #ddd 50%, transparent 50%);
    background-image: linear-gradient(0deg, #ddd, #ddd 50%, transparent 50%);
    background-origin: border-box;
    .inputContainer{
      flex: 1;
      display: flex;
      height: .6rem;
      margin-left: .28rem;
      border-radius: .1rem;
      background: #f6f6f6;
      .logo{
        float: left;
        width: .64rem;
        height: .6rem;
        background: url("css/i/search.png") center center no-repeat;
        background-size: .3rem .3rem;
      }
      input{
        height: .6rem;
        line-height: .6rem;
        flex: 1;
      }
    }
    .cancelSearch{
      width: 1.1rem;
      height: .6rem;
      line-height: .6rem;
      text-align: center;
      font-size: .28rem;
    }
  }
  .serachLable{
    padding: 0 .28rem;
    .serachLable-tit{
      display: flex;
      flex-direction: row;
      h3{
        flex: 1;
        height: .8rem;
        line-height: .82rem;
        padding-left: .36rem;
        font-weight:normal;
        font-size:.24rem;
      }
      .iconNear{
        background: url("css/i/time.png") center left no-repeat;
        background-size: .26rem .26rem;
      }
      .iconDelete{
        width:.6rem;
        height:.8rem;
        background: url("css/i/delete.png") center right no-repeat;
        background-size: .26rem .26rem;
      }
      .iconHot{
        background: url("css/i/star.png") center left no-repeat;
        background-size: .26rem .26rem;
      }
    }
    .labelList{
      ul{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-content: flex-start;
        li{
          height: .56rem;
          line-height: .56rem;
          margin: .2rem .2rem 0 0;
          padding: 0 .26rem;
          font-size: .24rem;
          border: .01rem solid #d8d8d8;
          border-radius: .04rem;
        }
      }
      .noLabel{
        flex: 1;
        text-align: center;
        font-size: .24rem;
        height: 1.4rem;
        line-height: 1.4rem;
        color: #999;
      }
    }
  }
  .searchLink{
    display: block;
    position: fixed;
    top: .9rem;
    right: 0;
    left: 0;
    bottom: 0;
    padding: 0 .3rem;
    background: #fff;
    color: #333;
    ul{
      li{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        height: .88rem;
        line-height: .88rem;
        font-size: .24rem;
        background-position: bottom;
        background-repeat: no-repeat;
        background-origin: content-box;
        background-size: 100% .01rem;
        background-image: -webkit-linear-gradient(bottom, #ddd, #ddd 50%, transparent 50%);
        background-image: linear-gradient(0deg, #ddd, #ddd 50%, transparent 50%);
        background-origin: border-box;
      }
    }
  }
}
</style>
