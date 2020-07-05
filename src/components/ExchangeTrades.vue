<template>
  <div>
    <h2>
      <span class="text-uppercase">{{ market[0] }}</span> real-time trades
    </h2>

    <div
      v-if="trades.length > 0"
      class="table-wrapper">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Exchange</th>
            <th>Base</th>
            <th>Quote</th>
            <th>Direction</th>
            <th style="width: 130px">Price</th>
            <th style="width: 130px">Price (USD)</th>
            <th style="width: 130px">Volume</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <ExchangeTradeRow
            v-for="(item, i) in trades"
            :key="i"
            :trade="item">
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
              <small>${{ parseFloat(item.priceUsd).toFixed(2) }}</small>
            </td>
            <td>
              <small>{{ item.volume }}</small>
            </td>
            <td>
              <small class="text-grey">{{ item.timestamp | parseDate }}</small>
            </td>
          </ExchangeTradeRow>
        </tbody>
      </table>
    </div>
  </div>
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
    market: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data () {
    return {
      trades: []
    }
  },
  computed: {},
  created () {
    const tradeWs = new WebSocket('wss://ws.coincap.io/trades/binance')

    tradeWs.onerror = function (err) {
      console.error('Socket encountered error: ', err.message, 'Closing socket')
      tradeWs.close()
    }

    const vm = this

    tradeWs.onmessage = function (msg) {
      vm.addNewItem(JSON.parse(msg.data))
    }
  },
  mounted () {
  },
  methods: {
    addNewItem (item) {
      const index = this.trades.findIndex((el) => {
        return el.base === item.base && el.quote === item.quote
      })

      if (index !== -1) {
        this.$set(this.trades, index, item)
      }
      else {
        if (this.trades.length < 10) {
          this.trades.push(item)
        }
      }
    }
  }
}
</script>
