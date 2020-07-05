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
        @change="updateMarkets">
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
            <th>Exchange name</th>
            <th>Pair</th>
            <th>Price</th>
            <th>Volume (24Hr)</th>
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
              <span class="text-uppercase">{{ item.exchangeId }}</span>
            </td>

            <td>
              {{ item.baseSymbol }}/{{ item.quoteSymbol }}
            </td>

            <td>
              {{ parseFloat(item.priceQuote).toFixed(2) }}
            </td>

            <td>
              <span v-if="item.volumeUsd24Hr > 0">
                ${{ parseFloat(item.volumeUsd24Hr).toFixed(2) }}
              </span>

              <span v-else class="text-dark">–</span>
            </td>

            <td>
              <span
                v-if="item.percentExchangeVolume"
                :class="[item.percentExchangeVolume > 0 ? 'text-success' : 'text-error']">
                {{ parseFloat(item.percentExchangeVolume).toFixed(2) }}
              </span>

              <span v-else class="text-dark">–</span>
            </td>

            <td>
              <span v-if="item.tradesCount24Hr">{{ item.tradesCount24Hr }}</span>
              <span v-else class="text-dark">–</span>
            </td>
          </tr>
        </tbody>
      </table>
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
import { mapState, mapActions } from 'vuex'
import 'vue-select/dist/vue-select.css'

export default {
  name: 'MarketsList',
  components: {},
  data () {
    return {
      selectedExchange: this.$route.params.exchangeId || ''
    }
  },
  computed: {
    ...mapState({
      list: state => state.markets.list,
      exchanges: state => state.exchanges.list,
      loading: state => state.markets.loading
    })
  },
  mounted () {
    this.getMarkets({ exchangeId: this.selectedExchange })
    this.getExchanges()
  },
  methods: {
    ...mapActions({
      getMarkets: 'markets/getMarkets',
      getExchanges: 'exchanges/getExchanges'
    }),
    updateMarkets () {
      this.$router.push(`/markets/${this.selectedExchange}`)
      this.getMarkets({ exchangeId: this.selectedExchange })
    }
  }
}
</script>
