<template>
  <div class="container">
    <p v-if="!exchangeId">
      Choose exchange
      <router-link to="/">here</router-link>
      to see trades
    </p>

    <ExchangeTrades v-if="exchangeId" :market="exchangeId"/>
  </div>
</template>

<style>
</style>

<script>

import ExchangeTrades from '@/components/ExchangeTrades'

export default {
  name: 'Trades',
  components: {
    ExchangeTrades
  },
  data () {
    return {}
  },
  computed: {
    exchangeId () {
      return this.$route.params.exchangeId
    }
  },
  created () {
  },
  methods: {}
}
</script>
