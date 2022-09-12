import Vue from 'vue'
import App from './App.vue'

import pluginComponent from '../packages/index'


Vue.use(pluginComponent)

// 挂载实例
// 方法1:
// new Vue({
//   render: h => h(App),
// }).$mount('#app')

// 方法2:
// new Vue({
//   render: h => h(App),
// }).$mount(document.getElementById('app'))

// 方法3:
// const app = new Vue({
//   render: h => h(App),
// }).$mount()
const AppCom = Vue.extend(App);
const ACVM = new AppCom({
  props: {
    name: {
      type: String,
      default: 'test'
    }
  },
  data() {
    return {
      age: 18
    }
  }
}).$mount()

console.log(ACVM);
document.getElementById('app').appendChild(ACVM.$el)

/**vm.$mount
 * 如果 Vue 实例在实例化时没有收到 el 选项，则它处于“未挂载”状态，没有关联的 DOM 元素。可以使用 vm.$mount() 手动地挂载一个未挂载的实例。
 * 如果没有提供 elementOrSelector 参数，模板将被渲染为文档之外的的元素，并且你必须使用原生 DOM API 把它插入文档中。
 */