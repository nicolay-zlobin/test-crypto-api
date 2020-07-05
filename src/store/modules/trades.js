const state = {
  candles: [],
  loading: false
}

const getters = {
  getOHLCVList: (state) => {
    return state.candles.map(item => {
      return {
        time: item.period / 1000,
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close
      }
    })
  }
}

const actions = {
  async getCandles ({ commit }, { exchange, baseId, quoteId }) {
    commit('SET_LOADING', true)

    await this._vm.$http
      .get(`${process.env.VUE_APP_COINCAP_BASE_URL}/candles`, {
        params: {
          exchange: exchange,
          interval: 'h8',
          baseId: baseId,
          quoteId: quoteId
        }
      })
      .then((res) => {
        commit('SET_CANDLES', res.data.data)
      })
      .finally(() => {
        commit('SET_LOADING', false)
      })
  }
}

const mutations = {
  SET_CANDLES (state, payload) {
    state.candles = payload
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
