/*
 * @Author: sunzhongjie
 * @Date: 2020-11-04 16:58:47
 * @LastEditors: Jelly
 * @LastEditTime: 2022-05-13 12:30:26
 */
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router)
const router = new Router({
  mode: "history",
  routes: [{
    path: '/custom',
    name: 'Custom',
    component: () => import('@pages/custom/view/index.vue'),
    children: [
      {
        path: 'select',
        name: 'CustomSelect',
        component: () => import('@/pages/custom/children/Select')
      },
      {
        path: 'slot',
        name: 'CustomSlot',
        component: () => import('@pages/custom/children/Slot/index')
      },
      {
        path: 'loading',
        name: 'CustomLoading',
        component: () => import('@pages/custom/children/Loading')
      },
      {
        path: 'scroll',
        name: 'CustomScroll',
        component: () => import('@pages/custom/children/Scroll')
      },
    ]
  }]
})
export default router;