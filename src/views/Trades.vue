<template>
  <div class="container">
    <p v-if="!exchangeId">
      Choose an exchange
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
  metaInfo () {
    return {
      title: this.title
    }
  },
  components: {
    ExchangeTrades
  },
  data () {
    return {}
  },
  computed: {
    exchangeId () {
      return this.$route.params.exchangeId
    },
    title () {
      const exchangeId = this.$route.params.exchangeId

      return exchangeId ? `Trades :: ${exchangeId.toUpperCase()}` : 'Trades'
    }
  },
  created () {
  },
  methods: {}
}
</script>
