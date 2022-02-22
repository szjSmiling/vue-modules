<template>
  <div id="nav">
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/mine" icon="orders-o">课程页</van-tabbar-item>
      <van-tabbar-item to="/profile" icon="manager-o">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style lang="scss">
*{margin: 0;padding:0;box-sizing: border-box;}
body{
  width: 100%;
  height: 100vh;
}
</style>
