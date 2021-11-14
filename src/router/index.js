import { Toast } from 'vant'
import { createRouter, createWebHashHistory } from 'vue-router'
import api from '../api'
import routes from './routes'
import store from '../store/index'
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach(async (to, from, next) => {
  // 需要登录的路由
  const arr = ['/person', '/updateperson', '/store']
  if (arr.includes(to.path)) {
    // 校验是否登录
    const isLogin = store.state.isLogin
    if (isLogin) { // 已登录
      next()
    } else if (isLogin === false) { // 未登录
      Toast('小主, 请您先登录~')
      next('/login')
    } else if (isLogin === null) { // 未校验过登录 或者 是登录后刷新页面
      try {
        const { code, data } = await api.checkLogin()
        if (+code !== 0) {
          Toast('小主, 请您先登录~')
          next('/login')
          return
        }
        store.commit('changeIsLogin', true)
        store.commit('changeInfo', data)
        next()
      } catch (error) { }
    }
  } else {
    next()
  }
})
export default router
