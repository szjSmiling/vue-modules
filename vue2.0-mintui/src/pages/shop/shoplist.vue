<template>
  <div id="shoplist">
    <head-top id="header">
      <i slot="left" class="iconfont icon-back"></i>
      <span slot="title">Shopping</span>
      <i slot="right" class="iconfont icon-cart" @click="$router.push('/shopList5?id=1')"></i>
    </head-top>
    <load-more>
      <ul slot="loadmore">
        <li v-for="(item,index) in 30" :key="index">{{item}}</li>
      </ul>
    </load-more>
  </div>
</template>
<script>
import headTop from "@/components/head/header.vue";
import loadMore from 'Components/loadmore/loadmore.vue';
export default {
  components:{
    headTop,
    loadMore,
  },
  data () {
    return {
      timer:null,
      list:[
        // {id:0,title:"",url:require("Assets/images/shop/1.png")},
        // {id:1,title:"",url:require("Assets/images/shop/2.png")},
        // {id:2,title:"",url:require("Assets/images/shop/3.png")},
        // {id:3,title:"",url:require("Assets/images/shop/4.png")},
        // {id:4,title:"",url:require("Assets/images/shop/5.png")},
        // {id:5,title:"",url:require("Assets/images/shop/6.png")},
      ]
    }
  },
  methods:{
    
  },
}
</script>
<style lang="less" scoped>
#shoplist{
  .page-loadmore{
    padding-top: 0.5rem;
  }
}
</style>

