import Vue from 'vue'
import Vuex from 'vuex'
import exchanges from '@/store/modules/exchanges'
import markets from '@/store/modules/markets'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    exchanges,
    markets
  }
})
