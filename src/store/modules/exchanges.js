const state = {
  list: [],
  loading: false
}

const getters = {}

const actions = {
  async getExchanges ({ commit }) {
    commit('SET_LOADING', true)

    await this._vm.$http
      .get(`${process.env.VUE_APP_COINCAP_BASE_URL}/exchanges`)
      .then((res) => {
        commit('SET_EXCHANGES', res.data.data)
      })
      .finally(() => {
        commit('SET_LOADING', false)
      })
  }
}

const mutations = {
  SET_EXCHANGES (state, payload) {
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
