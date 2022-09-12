/*
 * @Author: sunzhongjie
 * @Date: 2020-11-04 16:58:47
 * @LastEditors: Jelly
 * @LastEditTime: 2022-05-13 11:55:53
 */
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router)
const router = new Router({
  mode: "history",
  routes: [{
    path: '/function',
    name: 'Function',
    component: () => import('@pages/function/view/index'),
    children: [
      {
        path: '/webp',
        name: 'FunctionWebp',
        component: () => import('@pages/function/children/Webp')
      },
      {
        path: 'lottery',
        name: 'FunctionLottery',
        component: () => import('@/pages/function/children/Lottery')
      },
      {
        path: '/third-auth',
        name: 'FunctionThridAuth',
        component: () => import('@pages/function/children/ThirdAuth')
      }
    ]
  }]
})

export default router;