import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const Store = new Vuex.Store({
  state: {
    userName: '',
    isLogin: false
  },
  mutations: {
    add(state, data) {
      sessionStorage.setItem('userName', data)
      sessionStorage.setItem('isLogin', true)
      state.userName = data
      state.isLogin = true
    },
    del (state) {
      sessionStorage.removeItem('userName')
      sessionStorage.removeItem('isLogin')
      state.userName = ''
      state.isLogin = false
    }
  },
  getters: {
    isLogin (state) {
      if (!state.isLogin) {
        state.isLogin = sessionStorage.getItem('isLogin') != null ? sessionStorage.getItem('isLogin') : false
        state.userName = sessionStorage.getItem('userName') != null ? sessionStorage.getItem('userName') : ''
      }
      return state.isLogin
    }
  }
})

export default Store