<template>
  <div id="my-vuex2">
    <head-top id="header" >
      <i slot="left" class="iconfont icon-back"></i>
      <span slot="title">szjSmiling</span>
      <i slot="right" class="icon-right fa"></i>
    </head-top>
    <div class="content">
      <div class="top-distance">{{fullName}}</div>
    </div>
  </div>
</template>
<script>
import headTop from "@/components/head/header.vue";
import { Indicator, Toast } from "mint-ui";
import { mapGetters } from 'vuex';
import {mapActions} from "vuex";
export default {
  components:{
    headTop
  },
  data(){
    return {
      firstName: 'Foo',
      lastName: 'Bar'
    }
  },
  computed: {
    fullName: {
      // getter
      get: function () {
        return this.firstName + ' ' + this.lastName
      },
      // setter
      set: function (newValue) {
        var names = newValue.split(' ')
        this.firstName = names[0]
        console.log(newValue)
        this.lastName = names[names.length - 1]
      }
    }
  },
  methods: {
    setDate(){
      this.fullName = "John Doe";
    }
  },
  mounted () {
    this.setDate();
  }
}
</script>
<style lang="less" scoped>
#my-vuex2{
  .top-distance{height:0.5rem;}
  .content{
    font-size: 0.2rem;
    padding:0.1rem 0.15rem;
  }
}
</style>
