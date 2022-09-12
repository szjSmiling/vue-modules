<template>
  <div class="hello">
    <h1 @click="changeName"></h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  model: {
    prop: 'name',
    event: 'click'
  },
  props: {
    name: {
      default: 0
    },
  },
  methods: {
    changeValue(e) {
      this.$emit('input', e.target.value)
    },
    changeName() {
      this.$emit('click', 1)
    }
  }
}
</script>
<style scoped>

</style>
