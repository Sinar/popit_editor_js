import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false
  },
  mutations: {
    login (state) {
      state.loggedIn = true
    },
    logout (state) {
      state.loggedIn = false
    }
  },
  action: {
    login ({ commit }, authToken) {
      commit('login')
      localStorage.setItem('token', authToken)
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
