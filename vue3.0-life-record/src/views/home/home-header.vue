<template>
  <div class="home-header">
    <img class="logo" src="@/assets/logo.jpg" alt="">
    <van-dropdown-menu>
      <van-dropdown-item
        style="top:65px;"
        :modelValue="category"
        :options="options"
        @change="changeHandle" />
    </van-dropdown-menu>
  </div>
</template>
<script lang="ts">
import { CATEGORY_TYPES } from '@/typings/home'
import { defineComponent, PropType, reactive, toRefs } from 'vue'

export default defineComponent({
  props: {
    category: {
      type: Number as PropType<CATEGORY_TYPES>
    }
  },
  emits: ['setCurrentCategory'], // 为了提示作用的
  setup(props, context) {
    let state = reactive({
      options: [
        { text: '全部课程', value: CATEGORY_TYPES.ALL },
        { text: 'react课程', value: CATEGORY_TYPES.REACT },
        { text: 'vue课程', value: CATEGORY_TYPES.VUE },
        { text: 'node课程', value: CATEGORY_TYPES.NODE },
      ]
    })
    function changeHandle(value:CATEGORY_TYPES) {
      context.emit('setCurrentCategory', value)
    }
    return {
      ...toRefs(state),
      changeHandle
    }
  },
})
</script>
<style lang="scss">
.home-header{
  width: 100%;
  height: 65px;
  background: #2a2a2a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2.5%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  .logo{
    width: 50px;
  }
  .van-dropdown-menu{
    width: 100px;
  }
  .van-dropdown-menu__title{
    color: #fff;
  }
  .van-dropdown-menu__item{
    background: black;
  }
}

</style>
