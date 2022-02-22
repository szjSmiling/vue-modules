<template>
  <div>
    <van-card
      v-for="item in lessonList"
      :key="item.id"
      :num="item.num"
      :price="item.price"
      desc="描述信息"
      title="商品标题"
      thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
    />
    <div v-if="isLoading">loading...</div>
    <div v-if="!hasMore">我是有底线的</div>
  </div>
</template>
<script lang="ts">
import { ILesson } from '@/typings/home'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    isLoading: {
      type: Boolean
    },
    hasMore: {
      type: Boolean
    },
    lessonList: {
      type: Array as PropType<ILesson[]>
    }
  }
})
</script>
