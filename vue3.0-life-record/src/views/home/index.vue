<template>
  <div class="home">
    <!-- 首页头部 -->
    <HomeHeader
      :category="category"
      @setCurrentCategory="setCurrentCategory">
    </HomeHeader>
    <div class="home-container" ref="refreshElm">
      <van-field v-model="text" label="文本" :clearable="true" />
      <!-- 轮播图 -->
      <Suspense>
        <template #default>
          <HomeSwiper></HomeSwiper>
        </template>
        <template #fallback>
          <div>loading...</div>
        </template>
      </Suspense>
      <!-- 课程列表 -->
      <HomeList
        v-bind="{
          lessonList,
          isLoading,
          hasMore
       }"
      ></HomeList>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { IGlobalState } from '@/store';
import { Store, useStore } from 'vuex';
import { computed } from 'vue';
import HomeHeader from './home-header.vue';
import HomeSwiper from './home-swiper.vue';
import HomeList from './home-list.vue';
import { CATEGORY_TYPES } from '@/typings/home';
import * as Types from '@/store/action-types'
import { useLoadMore } from '@/hooks/useLoadMore'
// 专门为修改分类使用的 options api
function useCategory(store:Store<IGlobalState>) {
  let category = computed(() => store.state.home.currentCategory); // vuex中的状态
  function setCurrentCategory(category: CATEGORY_TYPES) {
    store.commit(`home/${Types.SET_CATEGORY}`, category)
  }
  return {
    category,
    setCurrentCategory
  }
}

function useLessonList(store:Store<IGlobalState>) {
  const lessonList = computed(() => store.state.home.lessons.list)
  onMounted(() => {
    if(lessonList.value.length === 0) { // 初始化加载, 如果已有数据就不用继续加载了
      store.dispatch(`home/${Types.SET_LESSON_LIST}`)
    }
  })
  return {
    lessonList
  }
}

// defineComponent, 开发中开启提示功能
export default defineComponent({
  components: {
    HomeHeader,
    HomeSwiper,
    HomeList,
  },
  setup() {
    // 1.需要获取vuex中的分类状态, 有个更改状态的功能
    let store = useStore<IGlobalState>()
    let { category, setCurrentCategory } =  useCategory(store)
    // 2. 课程获取
    let { lessonList } = useLessonList(store)

    // 获取真实dom
    const refreshElm = ref<null | HTMLElement>(null)
    const {isLoading, hasMore} = useLoadMore(refreshElm, store, `home/${Types.SET_LESSON_LIST}`)
    return {
      text: ref(''),
      category,
      setCurrentCategory,
      lessonList,
      refreshElm,
      isLoading,
      hasMore
    }
  }
})
</script>
<style lang="scss">
.home-container{
  position: absolute;
  top: 65px;
  bottom: 50px;
  width: 100%;
  overflow-y: scroll;
}
</style>
