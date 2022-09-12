<!--
 * @Author: sunzhongjie
 * @Date: 2020-11-04 16:58:47
 * @LastEditors: Jelly
 * @LastEditTime: 2022-05-13 15:25:15
-->
<template>
  <div class="container">
    <!-- <div class="content clear">
      <span>对象的名字：{{value.name}}</span>
      <MyInput v-model="value" />
    </div> -->
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  components: {
    MyInput: () => import('../children/vModel.vue')
  },
  data () {
    return {
      showPage: false,
      value: {
        name: ''
      },
    }
  },
  created () {
    this._SDelay(() => {
      this.showPage = true;
    }, 1)
  }
}
</script>
<style lang="less">

</style>