const state = {
  list: [],
  loading: false,
  limit: 15,
  offset: 0,
  isEndOfList: false
}

const getters = {}

const actions = {
  async getExchanges ({ commit, state }) {
    commit('SET_LOADING', true)

    await this._vm.$http
      .get(`${process.env.VUE_APP_COINCAP_BASE_URL}/exchanges`, {
        params: {
          limit: state.limit,
          offset: state.offset
        }
      })
      .then((res) => {
        commit('SET_OFFSET', state.offset + res.data.data.length)
        commit('SET_IS_END_OF_LIST', res.data.data.length < state.limit)
        commit('ADD_EXCHANGES', res.data.data)
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
  ADD_EXCHANGES (state, payload) {
    state.list.push(...payload)
  },
  SET_LOADING (state, payload) {
    state.loading = payload
  },
  SET_IS_END_OF_LIST (state, payload) {
    state.isEndOfList = payload
  },
  SET_OFFSET (state, payload) {
    state.offset = payload
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
