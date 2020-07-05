<template>
  <div class="container">
    <div v-if="$route.params.exchangeId">
      <Tabs>
        <Tab
          :selected="true"
          name="Trades list">
          <ExchangeTrades :market="market"/>
        </Tab>

        <Tab name="Chart">
          <ChartOHLC :market="market"/>
        </Tab>
      </Tabs>
    </div>

    <div v-else>
      <p>Choose an exchange to see trades</p>
    </div>
  </div>
</template>

<style>
</style>

<script>

import Tabs from '@/components/Functional/Tabs'
import Tab from '@/components/Functional/Tab'
import ChartOHLC from '@/components/ChartOHLC'
import ExchangeTrades from '@/components/ExchangeTrades'

export default {
  name: 'Trades',
  components: {
    Tabs,
    Tab,
    ChartOHLC,
    ExchangeTrades
  },
  data () {
    return {}
  },
  computed: {
    market () {
      return this.$route.params.exchangeId.split('-')
    }
  },
  created () {
  },
  methods: {}
}
</script>
