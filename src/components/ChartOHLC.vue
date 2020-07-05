<template>
  <div>
    <h2 class="text-uppercase">
      {{ market[0] }} {{ market[1] }}/{{ market[2] }}
    </h2>

    <p
      v-if="!loading && candles.length === 0"
      class="text-grey">
      Sorry, there is no data for <span class="text-uppercase">{{ market[0] }} {{ market[1] }}/{{ market[2] }}</span>.
    </p>

    <div class="d-flex justify-content-center mt-5 mb-5">
      <div
        id="chart"
        ref="chart"/>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>

<script>

import { mapGetters, mapActions, mapState } from 'vuex'
import { createChart } from 'lightweight-charts'

export default {
  name: 'ChartOHLC',
  components: {},
  props: {
    market: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      ohlc: 'trades/getOHLCVList'
    }),
    ...mapState({
      candles: state => state.trades.candles,
      loading: state => state.trades.loading
    })
  },
  watch: {
    ohlc (value) {
      if (value.length > 0) {
        this.renderChart()
      }
    }
  },
  mounted () {
    this.getCandles({
      exchange: this.market[0],
      baseId: this.market[1],
      quoteId: this.market[2]
    })
  },
  methods: {
    ...mapActions({
      getCandles: 'trades/getCandles'
    }),
    renderChart () {
      const settings = {
        width: 800,
        height: 420,
        layout: {
          backgroundColor: '#131722',
          textColor: '#d1d4dc'
        },
        crosshair: {
          mode: 1
        },
        grid: {
          vertLines: {
            color: 'rgba(42, 46, 57, 0)'
          },
          horzLines: {
            color: 'rgba(42, 46, 57, 0.6)'
          }
        },
        priceScale: {
          scaleMargins: {
            top: 0.3,
            bottom: 0.25
          },
          borderVisible: true
        },
        timeScale: {
          borderColor: 'rgba(197, 203, 206, 0.8)'
        }
      }

      const chart = createChart(this.$refs.chart, settings)

      const candleSeries = chart.addCandlestickSeries()

      candleSeries.setData(this.ohlc)
    }
  }
}
</script>
