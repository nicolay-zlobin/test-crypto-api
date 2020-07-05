<template>
  <div class="container">
    <div
      v-if="list.length > 0"
      class="table-wrapper">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Volume (24Hr)</th>
            <th>Volume % (24Hr)</th>
            <th>Trading pairs</th>
            <th>Socket</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, i) in list"
            :key="i"
            class="is-pointer"
            @click="$router.push(`/markets/${item.exchangeId}`) ">
            <td>
              {{ item.name }}
            </td>
            <!-- Daily volume represented in USD -->
            <td>
              <template v-if="item.volumeUsd">
                ${{ parseFloat(item.volumeUsd).toFixed(2) }}
              </template>

              <template v-else>
                <span class="text-dark">–</span>
              </template>
            </td>
            <!-- The amount of daily volume a single exchange transacts in relation
                 to total daily volume of all exchanges -->
            <td>
              <span
                v-if="item.percentTotalVolume"
                :class="[item.percentTotalVolume > 0 ? 'text-success' : 'text-error']">
                ${{ parseFloat(item.percentTotalVolume).toFixed(2) }}
              </span>

              <span v-else class="text-dark">–</span>
            </td>
            <!-- Number of trading pairs (or markets) offered by exchange -->
            <td>
              <span v-if="item.tradingPairs > 0">
                {{ item.tradingPairs }}
              </span>

              <span v-else class="text-dark">–</span>
            </td>
            <!-- true/false, true = trade socket available, false = trade socket unavailable -->
            <td>
              <span :class="[item.socket ? 'text-success' : 'text-dark']">
                {{ item.socket ? 'Available' : 'Unavailable' }}
              </span>
            </td>
            <td>
              <a
                :href="item.exchangeUrl"
                target="_blank"
                @click.stop>
                Link
              </a>
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
  name: 'ExchangesList',
  components: {},
  data () {
    return {}
  },
  computed: {
    ...mapState({
      list: state => state.exchanges.list,
      loading: state => state.exchanges.loading
    })
  },
  mounted () {
    this.getExchanges()
  },
  methods: {
    ...mapActions({
      getExchanges: 'exchanges/getExchanges'
    })
  }
}
</script>
