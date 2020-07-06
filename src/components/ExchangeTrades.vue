<template>
  <section>
    <p v-if="isError">
      Sorry, there is no data for <span class="text-uppercase">{{ exchange }}</span>,
      try to choose another
      <router-link to="/">exchange</router-link>
    </p>

    <div
      v-if="trades.length > 0"
      class="table-wrapper mb-40">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Exchange</th>
            <th>Base</th>
            <th>Quote</th>
            <th>Direction</th>
            <th style="min-width: 140px; width: 140px">Price</th>
            <th style="min-width: 140px; width: 140px">Price (USD)</th>
            <th style="min-width: 140px; width: 140px">Volume</th>
            <th>Date</th>
            <th>OHLC</th>
          </tr>
        </thead>
        <tbody>
          <ExchangeTradeRow
            v-for="(item, i) in trades"
            :key="i"
            class="is-pointer"
            :trade="item"
            @click.native="$router.push(`/chart/${item.exchange}–${item.base.toLowerCase()}–${item.quote.toLowerCase()}`) ">
            <td>
              <span class="text-uppercase">
                {{ item.exchange }}
              </span>
            </td>
            <td>
              <span class="text-uppercase">{{ item.base }}</span>
            </td>
            <td>
              <span class="text-uppercase">{{ item.quote }}</span>
            </td>
            <td>
              <span
                :class="[item.direction === 'buy' ? 'text-success' : 'text-error']"
                class="text-capitalize">{{ item.direction }}</span>
            </td>
            <td>
              <small>{{ item.price }}</small>
            </td>
            <td>
              <small>${{ parseFloat(item.priceUsd.toFixed(2)) }}</small>
            </td>
            <td>
              <small>{{ parseFloat(item.volume.toFixed(3)) }}</small>
            </td>
            <td>
              <small class="text-grey">{{ item.timestamp | parseDate }}</small>
            </td>
            <td>
              <router-link
                :to="`/chart/${item.exchange}-${item.base.toLowerCase()}-${item.quote.toLowerCase()}`"
                @click.stop>
                Link
              </router-link>
            </td>
          </ExchangeTradeRow>
        </tbody>
      </table>

      <div
        v-if="isShowMoreVisible"
        class="table-show-more"
        @click="showMore">
        Show more
      </div>
    </div>
  </section>
</template>

<script>
import dayjs from 'dayjs'
import ExchangeTradeRow from '@/components/ExchangeTradeRow'

export default {
  name: 'ExchangeTrades',
  components: {
    ExchangeTradeRow
  },
  filters: {
    parseDate (value) {
      if (!value) {
        return ''
      }

      return dayjs(value).format('MM.DD.YYYY HH:mm:ss')
    }
  },
  props: {
    exchange: {
      type: String,
      default: '',
      required: true
    }
  },
  data () {
    return {
      tradeWs: {},
      trades: [],
      limit: 8,
      isShowMoreVisible: true,
      isError: false
    }
  },
  computed: {},
  watch: {
    exchange (value) {
      if (value) {
        this.getTrades()
      }
    }
  },
  beforeDestroy () {
    this.tradeWs.close()
  },
  created () {
  },
  mounted () {
    if (this.exchange) {
      this.getTrades()
    }
  },
  methods: {
    getTrades () {
      this.tradeWs = new WebSocket(`wss://ws.coincap.io/trades/${this.exchange}`)

      this.tradeWs.onerror = function (err) {
        console.error('Socket encountered error: ', err.message, 'Closing socket')
        this.tradeWs.close()
      }

      const vm = this

      this.tradeWs.onmessage = function (msg) {
        if (msg.data.includes('invalid')) {
          vm.isError = true
        }
        else {
          vm.addNewItem(JSON.parse(msg.data))
        }
      }
    },
    showMore () {
      this.limit = this.limit + 5
    },
    addNewItem (item) {
      const index = this.trades.findIndex((el) => {
        return el.base === item.base && el.quote === item.quote
      })

      if (index !== -1) {
        this.$set(this.trades, index, item)
      }
      else {
        if (this.trades.length < this.limit) {
          this.trades.push(item)
        }
      }
    }
  }
}
</script>
