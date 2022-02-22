<template>
  <van-swipe class="home-swiper"
    v-if="sliderList.length"
    :autoplay="3000"
    indicator-color="white">
    <van-swipe-item
      v-for="item in sliderList"
      :key="item.url"
    >
      <!-- <img class="wh-full" :src="item.url" alt="" srcset=""> -->
      <img :src="item.url" alt="" srcset="">
    </van-swipe-item>
  </van-swipe>
</template>
<script lang="ts">
import { IGlobalState } from '@/store'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import * as Types from '@/store/action-types'

export default defineComponent({
  async setup() {
    // 页面一加载就要获取数据
    let store = useStore<IGlobalState>();
    let sliderList = computed(() => store.state.home.sliders);
    if(sliderList.value.length === 0) { // 缓存 如果数据没有获取过就请求接口
      await store.dispatch(`home/${Types.SET_SLIDER_LIST}`)
    }
    return {
      sliderList
    }
  },
})
</script>
<style lang="scss" scoped>
.home-swiper{
  height: 200px;
}
</style>
