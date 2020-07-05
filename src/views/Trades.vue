<template>
  <div class="container">
    <div v-if="$route.params.exchangeId">
      <Tabs>
        <Tab
          name="OHLC"
          :selected="true">
          <h1>OHLC</h1>
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

export default {
  name: 'Trades',
  components: {
    Tabs,
    Tab
  },
  data () {
    return {}
  },
  computed: {},
  methods: {}
}
</script>
