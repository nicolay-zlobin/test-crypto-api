<template>
  <section class="container">
    <h1>List of exchanges</h1>

    <div
      v-if="exchanges.length > 0"
      class="table-wrapper mb-40">
      <table class="table table-hover">
        <thead>
          <tr>
            <th style="width: 285px; min-width: 285px">Name</th>
            <th>Volume (24Hr)</th>
            <th>Volume % (24Hr)</th>
            <th>Trading pairs</th>
            <th>Socket</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, i) in exchanges"
            :key="i"
            class="is-pointer"
            @click="$router.push(`/trades/${item.exchangeId}`) ">
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

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import Spinner from '@/components/Functional/Spinner'
import { debounce } from 'lodash'

export default {
  name: 'ExchangesList',
  components: {
    Spinner
  },
  data () {
    return {}
  },
  computed: {
    ...mapState({
      exchanges: state => state.exchanges.list,
      loading: state => state.exchanges.loading,
      limit: state => state.exchanges.limit,
      isEndOfList: state => state.exchanges.isEndOfList,
      offset: state => state.exchanges.offset
    })
  },
  mounted () {
    this.setOffset(0)
    this.setExchanges([])
    this.getExchanges()
  },
  methods: {
    ...mapMutations({
      setOffset: 'exchanges/SET_OFFSET',
      setExchanges: 'exchanges/SET_EXCHANGES',
      setLoading: 'exchanges/SET_LOADING'
    }),
    ...mapActions({
      getExchanges: 'exchanges/getExchanges'
    }),
    showMore () {
      this.setLoading(true)
      this.loadExchanges()
    },
    loadExchanges: debounce(function () {
      this.getExchanges()
    }, 500)
  }
}
</script>
