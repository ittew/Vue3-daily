import { createApp } from 'vue'
// 导入Vant
import Vant, { Lazyload } from 'vant'
import App from './App.vue'
import './assets/reset.min.css'
import 'amfe-flexible'
import 'vant/lib/index.css'
import store from './store/index'
import router from './router/index'

/* 处理最大宽度 */
import { handleMaxWidth } from './assets/utils'
handleMaxWidth()
window.addEventListener('resize', handleMaxWidth)

const app = createApp(App)
app.use(Vant)
app.use(Lazyload, { lazyComponent: true })
app.use(store)
app.use(router)
app.mount('#app')
