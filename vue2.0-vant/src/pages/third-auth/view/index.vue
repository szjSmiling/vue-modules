<!--
 * @Author: sunzhongjie
 * @Date: 2020-11-04 16:58:47
 * @LastEditors: Jelly
 * @LastEditTime: 2021-03-19 10:25:59
-->
<template>
  <div class="container">
    <img class="iw-logo" :src="require('@assets/images/logo.png')" alt="vant" >
    <div class="btn-groups">
      <van-button id="signin-google-button">google sign in</van-button>
      <van-button id="signin-fb-button">facebook sign in</van-button>
      <van-button id="signin-apple-button">apple sign in</van-button>
      <div id="my-signin2" alt="谷歌自动生成登录按钮" style="display:flex;justify-content:center;"></div>
    </div>
  </div>
</template>
<script>
import { Button } from 'vant';
import { signinWithGoogle } from '@/tools/signin-with-google.js';
import { signinWithFacebook } from '@/tools/signin-with-facebook.js';
import { signinWithApple } from '@/tools/signin-with-apple.js';

export default {
  name: 'thrid-auth',
  components: {
    [Button.name]: Button
  },
  data () {
    return {
      
    }
  },
  mounted() {
    /**
     * signinWithGoogle(1, 'signin-google-button'), 手动点击 google 登录
     * signinWithGoogle(2, 'my-signin2'), 谷歌自动生成登录按钮
     * signinWithFacebook('signin-fb-button'), 加载facebook登陆的sdk, 初始化执行环境, 通过id绑定事件
     * signinWithApple('signin-apple-button'), 手动点击 apple 登录
     */
    signinWithGoogle(1, 'signin-google-button') // 先加载登录api
    // signinWithGoogle(2, 'my-signin2')
    signinWithFacebook('signin-fb-button')
    signinWithApple('signin-apple-button')
  }
}
</script>
<style lang="less" scoped>
*{text-align: center;}
.iw-logo{
  opacity: 0.5;
}
.btn-groups{
  margin: 0 16px;
  display:flex;
  justify-content: space-between;
  flex-wrap: wrap;
  button{
    margin-top: 16px;
  }
  #my-signin2{
    margin-top: 16px;
  }
}
</style>