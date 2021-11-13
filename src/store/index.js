import { createStore, createLogger } from 'vuex'
import api from '../api'
const env = process.env.NODE_ENV
export default createStore({
  state: {
    isLogin: null,
    info: null
  },
  mutations: {
    changeIsLogin (state, bool) {
      state.isLogin = bool
    },
    changeInfo (state, payload) {
      state.info = payload
    }
  },
  actions: {
    async changeIsLoginAsync ({ commit }) {
      let bool = false
      const { code } = await api.checkLogin()
      if (+code === 0) bool = true
      commit('changeIsLogin', bool)
    },
    async changeInfoAsync ({ commit }) {
      const { code, data } = await api.userInfo()
      if (+code === 0) {
        commit('changeInfo', data)
      }
    }
  },
  plugins: env === 'production' ? [] : [createLogger()]
})
