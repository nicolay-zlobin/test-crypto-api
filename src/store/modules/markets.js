const state = {
  list: [],
  loading: false
}

const getters = {}

const actions = {
  async getMarkets ({ commit }, params = {}) {
    await this._vm.$http
      .get(`${process.env.VUE_APP_COINCAP_BASE_URL}/markets`, {
        params: {
          // ...condition && { prop: value }
          ...params.exchangeId && { exchangeId: params.exchangeId }
        }
      })
      .then((res) => {
        commit('SET_MARKETS', res.data.data)
      })
      .finally(() => {
        commit('SET_LOADING', false)
      })
  }
}

const mutations = {
  SET_MARKETS (state, payload) {
    state.list = payload
  },
  SET_LOADING (state, payload) {
    state.loading = payload
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
