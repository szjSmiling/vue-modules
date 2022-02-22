import { createApp } from "vue"
import App from './App.vue'
import router from './router'
import store from './store'
// import i18nPlugin from './plugins/i18n'
// const i18nStrings = {
//   greetings: {
//     hi: 'Hallo!'
//   }
// }

import Vant from "vant"
import 'vant/lib/index.css'
import '@/styles/index.scss'

createApp(App)
.use(Vant)
.use(store)
.use(router)
// .use(i18nPlugin, i18nStrings)
.mount('#app')
