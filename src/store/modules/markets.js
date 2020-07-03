const state = {
  list: []
}

const getters = {}

const actions = {
  async getMarkets ({ commit }) {
    await this._vm.$http
      .get(`${process.env.VUE_APP_COINCAP_BASE_URL}/markets`)
      .then((res) => {
        commit('SET_MARKETS', res.data.data)
      })
  }
}

const mutations = {
  SET_MARKETS (state, payload) {
    state.list = payload
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}