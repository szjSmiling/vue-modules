<template>
	<div id="footer">
    <div class="foot-content">
      <p>
        <span @click="$router.push('/shoplist')">shoplist1</span>
        <span @click="$router.push('/shoplist2')">shoplist2</span>
        <span @click="$router.push('/shoplist3')">shoplist3</span>
        <span @click="$router.push('/shoplist4')">shoplist4</span>
      </p>
      <p>2018-2019© szjSmiling.com. All Rights Reserved</p>
    </div>
	</div>
</template>
<script>
export default {
  data() {
    return {
      
    }
  }
};
</script>
<style lang="less" scoped>
#footer {
    width: 100%;
    height: 0.58rem;
    display: table;
    position: fixed;
    bottom: 0;
    background-color: #0b9d78;
    z-index: 10;
  .foot-content{
    display: table-cell;
    vertical-align: middle;
    p {
      font-size: 0.14rem;
      color: #fff;
      margin: 0.1rem 0;
      span {
        border-right: 1px solid #fff;
        display: inline-block;
        padding: 0 0.1rem;
      }
      span:nth-child(4) {
        border-right: none;
      }
    }
  }
}
</style>
