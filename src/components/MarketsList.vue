<template>
  <section class="container">
    <h1>Markets</h1>

    <div class="filter filter-exchange">
      <label
        class="mb-10 filter-label"
        for="exchanges">Select exchange to filter markets:</label>

      <select
        id="exchanges"
        v-model="selectedExchange"
        class="mb-30"
        name="exchanges"
        @change="filterMarketsByExchange">
        <option value="">--Choose an exchange--</option>
        <option
          v-for="(item, i) in exchanges"
          :key="i"
          :value="item.exchangeId">
          {{ item.name }}
        </option>
      </select>
    </div>

    <div
      v-if="list.length > 0"
      class="table-wrapper">
      <table class="table table-hover">
        <thead>
          <tr>
            <th style="min-width: 185px; width: 185px">Exchange name</th>
            <th style="min-width: 185px; width: 185px">Pair</th>
            <th style="min-width: 130px; width: 130px">Price</th>
            <th style="min-width: 180px; width: 180px">Volume (24Hr)</th>
            <th>Volume % (24Hr)</th>
            <th>Trades count (24Hr)</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, i) in list"
            :key="i"
            class="is-pointer"
            @click="$router.push(`/trades/${item.exchangeId}`)">
            <td>
              <span class="text-uppercase">{{ item.exchangeId }}  {{ item.rank }}</span>
            </td>

            <td>
              {{ item.baseSymbol }}/{{ item.quoteSymbol }}
            </td>

            <td>
              <small>{{ parseFloat(item.priceQuote).toFixed(2) }}</small>
            </td>

            <td>
              <span v-if="item.volumeUsd24Hr > 0">
                <small>${{ parseFloat(item.volumeUsd24Hr).toFixed(2) }}</small>
              </span>

              <span v-else class="text-dark">–</span>
            </td>

            <td>
              <span
                v-if="item.percentExchangeVolume"
                :class="[item.percentExchangeVolume > 0 ? 'text-success' : 'text-error']">
                <small>{{ parseFloat(item.percentExchangeVolume).toFixed(2) }}</small>
              </span>

              <span v-else class="text-dark">–</span>
            </td>

            <td>
              <small v-if="item.tradesCount24Hr">{{ item.tradesCount24Hr }}</small>
              <span v-else class="text-dark">–</span>
            </td>
          </tr>
        </tbody>
      </table>

      <div
        v-if="!isEndOfList"
        class="table-show-more"
        @click="showMore">
        <span v-show="!loading">Show more</span>
        <Spinner v-show="loading"/>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  .filter.filter-exchange {
    max-width: 300px;
    .filter-label {
      display: block;
    }
  }
</style>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { debounce } from 'lodash'
import Spinner from '@/components/Functional/Spinner'

export default {
  name: 'MarketsList',
  components: {
    Spinner
  },
  data () {
    return {
      selectedExchange: this.$route.params.exchangeId || ''
    }
  },
  computed: {
    ...mapState({
      list: state => state.markets.list,
      loading: state => state.markets.loading,
      isEndOfList: state => state.markets.isEndOfList,
      offset: state => state.markets.offset,
      exchanges: state => state.exchanges.list
    }),
    params () {
      return {
        exchangeId: this.selectedExchange
      }
    }
  },
  created () {
    this.resetExchanges()
    this.getExchanges({ limit: 100 })

    this.resetMarkets()
    this.getMarkets({ exchangeId: this.selectedExchange })
  },
  methods: {
    ...mapMutations({
      setLoading: 'markets/SET_LOADING'
    }),
    ...mapActions({
      getMarkets: 'markets/getMarkets',
      resetMarkets: 'markets/resetMarkets',
      getExchanges: 'exchanges/getExchanges',
      resetExchanges: 'exchanges/resetExchanges'
    }),
    filterMarketsByExchange () {
      this.$router.push(`/markets/${this.selectedExchange}`)
      this.resetMarkets()
      this.loadMarkets({})
    },
    showMore () {
      this.setLoading(true)
      this.loadMarkets({ action: 'show_more' })
    },
    loadMarkets: debounce(function ({ action = '' }) {
      this.getMarkets({ action, ...this.params })
    }, 500)
  }
}
</script>
