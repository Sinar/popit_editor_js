import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: !!localStorage.getItem('token')
  },
  mutations: {
    login (state) {
      state.loggedIn = true
    },
    logout (state) {
      state.loggedIn = false
    }
  },
  actions: {
    login ({ commit }, authToken) {
      commit('login')
      localStorage.setItem('token', authToken.authToken)
    },
    logout ({ commit }) {
      commit('logout')
      localStorage.removeItem('token')
    }
  },
  getters: {
    isLoggedIn: state => {
      return state.loggedIn
    }
  }
})
