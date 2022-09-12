<template>
  <div>
    <!-- <input type="text" :value="value" @input="changeValue"> -->
    <button @click="changeName">点击改变对象名字</button>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'click'
  },
  props: {
    value: {
      default: () => ({name: '测试'})
    }
  },
  methods: {
    changeValue(e) {
      this.$emit('input', e.target.value)
    },
    changeName() {
      this.$emit('click', { name: 'yafei = ' + Math.random(0, 1) })
    }
  }
}
</script>

<style>

</style>