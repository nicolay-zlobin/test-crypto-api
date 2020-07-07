const state = {
  list: [],
  loading: false,
  limit: 12,
  offset: 0,
  isEndOfList: false
}

const getters = {}

const actions = {
  resetMarkets ({ commit }) {
    commit('SET_OFFSET', 0)
    commit('SET_MARKETS', [])
  },
  async getMarkets ({ commit }, { exchangeId, action = '' }) {
    await this._vm.$http
      .get(`${process.env.VUE_APP_COINCAP_BASE_URL}/markets`, {
        params: {
          // ...condition && { prop: value }
          ...exchangeId && { exchangeId },
          limit: state.limit,
          offset: state.offset
        }
      })
      .then((res) => {
        commit('SET_OFFSET', state.offset + res.data.data.length)
        commit('SET_IS_END_OF_LIST', res.data.data.length < state.limit)

        commit(action === 'show_more' ? 'ADD_MARKETS' : 'SET_MARKETS', res.data.data)
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
  ADD_MARKETS (state, payload) {
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
