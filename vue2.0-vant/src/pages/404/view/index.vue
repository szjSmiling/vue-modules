<!--
 * @Author: sunzhongjie
 * @Date: 2020-12-11 11:04:18
 * @LastEditors: Jelly
 * @LastEditTime: 2020-12-11 11:06:11
-->
<template lang="">
  <div class="container">
    <h2>404</h2>
    <van-button type="danger" :url="url">GO Back</van-button>
  </div>
</template>
<script>
import { Button } from 'vant'
export default {
  components: {
    [Button.name]: Button
  },
  data() {
    return {
      url: window.location.origin
    }
  }
}
</script>
<style lang="less" scoped>
.container{
  h2{
    text-align: center;
    font-size: 25px;
  }
  .van-button{
    margin-top: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>