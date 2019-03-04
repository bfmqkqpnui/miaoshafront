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
  data () {
    return {
    	memberId: '',
      hotSearchArry: [],
      historySearchArry: [],
      thinkSearchArry: [],
      thinkKeyword: '',
      placeholderKey: this.$route.query.key || '搜索热门商品'
    }
  },
  created() {
  },
  methods: {
    // 清楚本地搜索历史缓存记录
    clearSearchHistory() {
      console.log("清楚本地搜索历史缓存记录")
    }
  },
  mounted() {
  },
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
