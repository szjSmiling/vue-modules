<template>
  <div >
    <div id="app">
      <head-com>
        <i class="iconfont icon-back" slot="left"></i>
        <div slot="title">Development</div>
        <i slot="right"></i>
      </head-com>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
    <!-- <div id="app2">
      <smart-list :items="items" :isOrdered="true">
        <h1>我是组件内的子节点!</h1>
        <p slot="foo">函数式组件内的具名 slot: foo</p>
      </smart-list>
    </div> -->
  </div>
</template>
<script>
import HeadCom from '@/components/head/header.vue'

export default {
  components: {
    HeadCom,
  },
  data () {
    return {
      items: 'div'
    };
  },
  created () {
    console.log("the hook of created is done!");
  },
  mounted () {
    console.log("the hook of mounted is done!");
  },
  activated () {
    console.log("after keep-alive,refresh page activated is done!");
  },
  deactivated () {
    window.removeEventListener('popstate', () => { console.log('000') });
    console.log("after keep-alive,refresh page deactivated is done!");
  },
};
</script>
<style lang="less">
@import "./assets/css/common.css";
@import "./assets/css/reset.css";
@import './assets/sprites/sprite.css';
*{ box-sizing: border-box;}
#app2{
  font-size: 0.2rem;
  * {
    padding: 0.02rem 0;
  }
}
#app, #app2 {
  font-family: Helvetica, Arial, sans-serif, "Avenir";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // height: inherit;
}

@font-face {
  font-family: "WebRupee";
  src: url("./assets/font/WebRupee.V2.0.ttf");
}

.rs {
  font-family: "WebRupee";
  font-weight: normal;
  margin-right: 0.2em;
}
img{vertical-align: top;}
h1,
h2 {
  font-weight: normal;
  font-size:0.2rem;
}

ul {
  list-style-type: none;
  padding: 0;
}

input,
select {
  border: none;
  border-radius: 4px;
}
.picker-toolbar{
  font-size:0.2rem;
  height:0.4rem;
  line-height:0.4rem;
  color: #f655f6;
}
.mt-range-progress {
  background-color: #ffad3d !important;
}
.mint-indicator-wrapper{
  line-height: 0;
}
.mint-indicator-text {
  color: #ffad3d !important;
  font-size: 0.16rem !important;
  line-height:0.2rem;
}

.mint-popup {
  border-radius: 0.04rem;
  font-size: 0.18rem;
  // padding: 0.1rem;
  border: 1px solid #eee;
}

.mint-indicator {
  position: fixed;
  z-index: 20;
  -webkit-transition: opacity 0.2s linear;
  transition: opacity 0.2s linear;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1) !important;
}

.mint-radio-input:checked + .mint-radio-core {
  background-color: #fff !important;
  border-color: #ccc !important;
}

.mint-radio-input:checked + .mint-radio-core::after {
  background-color: #ffa033 !important;
}

.mint-radiolist,
.mint-cell-wrapper,
.mint-radiolist-label {
  padding: 0 !important;
}

.mint-radio-label {
  font-size: 0.16rem;
}

.mint-loadmore{
  .mint-loadmore-top{
    font-size:0.2rem;
  }
  .mint-loadmore-bottom{
    font-size:0.2rem;
  }
}

</style>
