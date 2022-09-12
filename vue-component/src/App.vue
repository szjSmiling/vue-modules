<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <vue-button></vue-button>
    <vue-msg></vue-msg>
    <HelloWorld v-model="obj.a" />
    <button @click="testObj">test</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { szjFloat } from 'fnpljs'
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      obj: {}
    }
  },
  created() {
    console.log('乘法：8888.8 * 100 = ', szjFloat.multiple(8888.8, 100))
    console.log('乘法：88 * 1.21 * 25 * 1.25 = ', szjFloat.multiple(88, 1.21, 25, 1.25))
    this.obj = { a: 2 }
  },
  methods: {
    testObj() {
      this.obj.a = 55
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
