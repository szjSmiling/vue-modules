import { IGlobalState } from "@/store";
import { computed, onMounted, Ref } from "vue";
import { Store } from "vuex";
import _ from "lodash";

export function useLoadMore(refreshElm:Ref<null | HTMLElement>, store: Store<IGlobalState>, type: string) {
  
  // 防抖
  let element: HTMLElement;

  function _loadMore() {
    // 获取可视区域高度 卷去的高度  整个高度
    const containerHeight = element.clientHeight
    const scrollTop = element.scrollTop
    const scrollHeight = element.scrollHeight

    if(containerHeight + scrollTop + 20 >= scrollHeight) {
      store.dispatch(type)
    }
  }



  onMounted(() => {
    element = refreshElm.value as HTMLElement;
    element.addEventListener('scroll', _.debounce(_loadMore, 200))
  })
  
  const isLoading = computed(() => {
    return store.state.home.lessons.loading
  })
  const hasMore = computed(() => {
    return store.state.home.lessons.hasMore
  })
  
  return {
    isLoading,
    hasMore
  }
}