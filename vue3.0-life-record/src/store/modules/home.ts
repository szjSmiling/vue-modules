import { getLessons, getSliders } from "@/api/home"
import { CATEGORY_TYPES, IHomeState, ILessons, ISliders } from "@/typings/home"
import { delay } from "lodash"
import { Module } from "vuex"
import { IGlobalState } from ".."
import * as Types from '../action-types'

// 首页里应该存哪些数据
const state: IHomeState = {
  currentCategory: CATEGORY_TYPES.ALL,
  sliders: [],
  lessons: {
    hasMore: true, // 有没有更多属性
    loading: false, // 默认没有正在加载
    offset: 0,
    limit: 5,
    list: [], // 已经显示到页面的数据
  }
}

// Module里的参数 1)自己的state, 2)全局的state
const home: Module<IHomeState, IGlobalState> = {
  namespaced: true,
  state,
  mutations: {
    [Types.SET_CATEGORY](state, payload: CATEGORY_TYPES) {
      state.currentCategory = payload
    },
    [Types.SET_SLIDER_LIST](state, payload:ISliders[]) {
      state.sliders = payload
    },
    [Types.SET_LOADING](state, payload:boolean) {
      state.lessons.loading = payload
    },
    [Types.SET_LESSON_LIST](state, payload:ILessons) {
      state.lessons.list = [...state.lessons.list, ...payload.list]
      state.lessons.hasMore = state.lessons.list.length > 10 ? false : payload.hasMore
      state.lessons.offset = state.lessons.offset + payload.list.length
    }
  },
  actions: {
    async [Types.SET_SLIDER_LIST]({ commit }) {
      await getSliders<ISliders>();
      const sliders = [
        { url: 'https://images.unsplash.com/flagged/photo-1563248101-a975e9a18cc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' },
        { url: 'https://images.unsplash.com/photo-1520182205149-1e5e4e7329b4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' },
        { url: 'https://images.unsplash.com/flagged/photo-1563248101-a975e9a18cc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' },
        { url: 'https://images.unsplash.com/photo-1501421018470-faf26f6b1bef?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' },
      ]
      commit(Types.SET_SLIDER_LIST, sliders);
    },
    async [Types.SET_LESSON_LIST]({ commit }) {
      if(state.lessons.loading) {
        return
      }
      if(!state.lessons.hasMore) {
        return
      }
      commit(Types.SET_LOADING, true); // 开始加载数据
      await getLessons<ILessons>(state.currentCategory, state.lessons.offset, state.lessons.limit);
      delay(() => {
        const lessons = {
          hasMore: true,
          list: [
            { id: 1, price: '2.00', num: 2 },
            { id: 2, price: '2.00', num: 2 },
            { id: 3, price: '2.00', num: 2 },
            { id: 4, price: '2.00', num: 2 },
            { id: 5, price: '2.00', num: 2 },
            { id: 6, price: '2.00', num: 2 },
          ]
        }
        commit(Types.SET_LESSON_LIST, lessons);
        commit(Types.SET_LOADING, false);
      }, 1000)
    }
  }
}

export default home