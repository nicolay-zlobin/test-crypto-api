<template>
  <div class="container">
    <div v-if="$route.params.exchangeId">
      <Tabs>
        <Tab
          name="Chart"
          :selected="true">
          <h1 class="text-uppercase">
            {{ market[0] }} {{ market[1] }}/{{ market[2] }}
          </h1>

          <ChartOHLC :market="market"/>
        </Tab>

        <Tab name="Trades list">
          <h1>Trades list</h1>
        </Tab>
      </Tabs>
    </div>

    <div v-else>
      <p>Choose an exchange to see trades</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>

<script>

import Tabs from '@/components/Functional/Tabs'
import Tab from '@/components/Functional/Tab'
import ChartOHLC from '@/components/ChartOHLC'

export default {
  name: 'Trades',
  components: {
    Tabs,
    Tab,
    ChartOHLC
  },
  data () {
    return {
      market: this.$route.params.exchangeId.split('-')
    }
  },
  computed: {},
  methods: {}
}
</script>
