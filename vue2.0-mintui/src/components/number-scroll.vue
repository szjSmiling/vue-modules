<template>
  <div class="number-grow-warp">
    <span ref="numberGrow" :data-time="time" class="number-grow" :data-value="value">0</span>
 </div>
</template>
<script>
export default {
 props: {
  time: {
   type: Number,
   default: 2
  },
  value: {
   type: Number,
  //  default: 7200
  }
 },
 watch: {
   value(val){
     console.log(val)
   }
 },
 methods: {
  numberGrow (ele) {
    debugger;
   let _this = this
   let step = parseInt((_this.value * 10) / (_this.time * 1000))
   let current = 0
   let start = 0
   let t = setInterval(function () {
    start += step
    if (start > _this.value) {
     clearInterval(t)
     start = _this.value
     t = null
    }
    if (current === start) {
     return
    }
    current = start
    ele.innerHTML = current.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')
    console.log(current);
   }, 10)
  }
 },
 mounted () {
  this.numberGrow(this.$refs.numberGrow)
 }
}
</script>
<style scoped>
.number-grow-warp{
 transform: translateZ(0);
}
.number-grow {
  font-size: 20px;
  color: #ffaf00;
  letter-spacing: 2.67px;
  margin:110px 0 20px;
  display: block;
  line-height:64px;
}
</style>