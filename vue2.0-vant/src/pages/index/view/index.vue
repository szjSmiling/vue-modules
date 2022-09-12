<!--
 * @Author: sunzhongjie
 * @Date: 2020-11-04 16:58:47
 * @LastEditors: Jelly
 * @LastEditTime: 2022-07-04 10:55:24
-->
<template>
  <div class="container">
    <button class="backTop" v-show="backTop" @click="backTopHandle">Top</button>
    <template v-for="entry of pageEntries">
      <div class="content clear" :key="entry.id">
        <h4>{{entry.name}}</h4>
        <van-button
          type="default"
          v-for="page of entry.children"
          :key="page.id"
          :url="entry.path + page.path">{{page.name}}
        </van-button>
      </div>
    </template>
    <div class="lucky-prize-list">
    <div class="lpl-title">BIG PRIZES ARE WAITING FOR YOU</div>
    <div class="lpl-list" ref="lplListBox">
      <ul class="lpl-ul flex" ref="lplList">
        <li class="lpll-item" v-for="(item, index) in list"
          :key="index"
          @click="jumpToPrizeDetailEvent(item)">
          <div class="lpll-item-child">
            <!-- <img :src="item.commodityImg" alt=""> -->
            <p class="lpll-item-title ellipsis">{{item.commodityDetailsName}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
  </div>
</template>
<script>
import { Button } from 'vant';
import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';

export default {
  name: 'HelloWorld',
  components: {
    [Button.name]: Button,
  },
  data () {
    return {
      throttle,
      backTop: false,
      pageEntries: [
        { id: "1", name: '自定义组件', path: '/custom', children: [
          { id: "1-1", path: '/slot', name: 'Slot' },
          { id: "1-2", path: '/scroll', name: 'Scroll' },
          { id: "1-3", path: '/vModel', name: 'vModel' },
          { id: "1-4", path: '/select', name: 'Select' },
          { id: "1-4", path: '/loading', name: 'Loading' },
        ] },
        { id: 5, name: '功能组件', path: '/', children: [
          { id: "5-1", path: '/function', name: 'Function' },
          { id: "5-2", path: '/function', name: '防抖节流' },
          { id: "5-3", path: '/webp', name: 'Webp' },
          { id: "5-4", path: '/third-auth', name: '三方登录' },
        ] },
        { id: 3, name: '表单组件', path: '/', children: [
          { id: "3-1", path: '/form', name: 'Form' }
        ] },
        { id: 4, name: 'Canvas组件', path: '/', children: [
          { id: "4-1", path: '/canvas', name: 'Canvas' }
        ] },
        { id: 6, name: '错误组件', path: '/', children: [
          { id: "6-1", path: '/404', name: '404', type: 'warning' }
        ] },
      ],
      list: [
        { commodityImg: '', commodityDetailsName: "数据1" },
        { commodityImg: '', commodityDetailsName: "数据2" },
        { commodityImg: '', commodityDetailsName: "数据3" },
        { commodityImg: '', commodityDetailsName: "数据4" },
        { commodityImg: '', commodityDetailsName: "数据5" },
        { commodityImg: '', commodityDetailsName: "数据6" },
      ],
     scrollX: 0,
     prizeTimer: null
    }
  },
  created() {
    console.log('created: parent');
    window.addEventListener('scroll', this.scrollHandler)
    this.scrollAuto(this.list)
  },
  mounted() {
    console.log('mounted: parent');
  },
  methods: {
    scrollAuto (val) {
      clearInterval(this.prizeTimer);
      this.$nextTick(()=>{
          const tag = this.$refs.lplList.style;
          const item = document.getElementsByClassName('lpll-item')[0];
          const width = item.offsetWidth;
          if (val.length >= 4) {
              this.prizeTimer = setInterval(() => {
                this.scrollX++;
                for(let i = 0; i < val.length; i++) {
                  if (this.scrollX === (i * width + width)) {
                    let first = val[i];
                    this.list.push(first);
                    this.list.shift();
                    this.scrollX = 0;
                  }
              }
              tag.transform = `translateX(-${this.scrollX}px)`;
              }, 25)
          }
        })
    },
    awaitFn() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('同步变化')
        }, 0)
      })
    },
    backTopHandle() {
      window.scrollTo(0, 0)
    },
    scrollHandler(e) {
      let scrollTop = e.target.scrollingElement.scrollTop;
      // let clientHeight = e.target.scrollingElement.clientHeight;
      if(scrollTop >= 30) {
        this.backTop = true;
      } else {
        this.backTop = false;
      }
    },
    clickEvent: debounce(function() {
      console.log('debounce')
    }, 2000, { leading: true, trailing: false }),
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollHandler)
  }
}
</script>
<style lang="less" scoped>
.content{
  margin-top: 10px;
  padding-bottom: 10px;
  padding-left: 16px;
  padding-right: 16px;
  border-bottom: 1px solid #ddd;
  h4{
    font-size: 16px;
  }
  .van-button{
    float: left;
    margin-top: 10px;
    margin-right: 1%;
    min-width: 20%;
    height: 1rem;
    line-height: 1rem;
    font-size: 13px;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    // .van-button__text{}
  }
}
.backTop{
  position: fixed;
  bottom: 120px;
  right: 20px;
  font-size: 16px;
  opacity: 0.5;
}


.lucky-prize-list{
  border-radius: 6px;
  overflow: hidden;
  .lpl-title{
    padding: 0.26rem 0;
    font-size: 0.75rem;
    color:#fff;
    line-height: 1.19rem;
    text-align: center;
    text-shadow:0px 0px 0px rgba(210,63,7,0.53);
    background:linear-gradient(232deg,rgba(255,224,57,1) 0%,rgba(251,57,105,1) 100%);
  }
  .lpl-list{
    box-sizing: border-box;
    width: 100%;
    padding: 0.34rem 0;
    background: rgba(255, 255, 255, 0.35);
  }
  .lpl-ul{
    box-sizing: border-box;
  }
  // .lpll-item{}
  .lpll-item-child{
    flex-shrink: 0;
    margin-left: 0.34rem;
    width: 4rem;
    background: #fff;
    border-radius: 6px;
    overflow: hidden;
    img{
      display: block;
      width: 100%;
      height: 2.39rem;
      background: #eee;
      border-radius: 6px 6px 0 0;
    }
    p{
      box-sizing: border-box;
      margin: auto;
      width: 4rem;
      line-height: 100px;
      min-height: 100px;
      padding:0 0.2rem;
      height: 0.85rem;
      line-height: 0.85rem;
      color: #9E1B20;
      text-align: center;
      font-size: 0.43rem;
      border-radius: 0 0 6px 6px;
      background:linear-gradient(180deg,rgba(255,255,255,1) 0%,rgba(255,255,255,1) 24%,rgba(255,226,188,1) 100%);
    }
  }
}
</style>