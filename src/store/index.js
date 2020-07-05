import Vue from 'vue'
import Vuex from 'vuex'
import exchanges from '@/store/modules/exchanges'
import markets from '@/store/modules/markets'
import trades from '@/store/modules/trades'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme: 'dark'
  },
  mutations: {
    SET_THEME (state, payload) {
      state.theme = payload
    }
  },
  actions: {
  },
  modules: {
    exchanges,
    markets,
    trades
  }
})
