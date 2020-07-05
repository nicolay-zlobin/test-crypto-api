<template>
  <div class="container">
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
            @click="$router.push(`/trades/${item.exchangeId}`) ">
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
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'MarketsList',
  components: {},
  data () {
    return {}
  },
  computed: {
    ...mapState({
      list: state => state.markets.list,
      loading: state => state.markets.loading
    })
  },
  mounted () {
    this.getMarkets()
  },
  methods: {
    ...mapActions({
      getMarkets: 'markets/getMarkets'
    })
  }
}
</script>
