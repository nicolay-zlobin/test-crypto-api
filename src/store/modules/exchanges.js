const state = {
  list: []
}

const getters = {}

const actions = {
  async getExchanges ({ commit }) {
    await this._vm.$http
      .get(`${process.env.VUE_APP_COINCAP_BASE_URL}/exchanges`)
      .then((res) => {
        commit('SET_EXCHANGES', res.data.data)
      })
  }
}

const mutations = {
  SET_EXCHANGES (state, payload) {
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
