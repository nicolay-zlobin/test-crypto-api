<template>
  <div class="container">
    <template v-if="exchangeId">
      <h2>
        <span class="text-uppercase">{{ exchangeId }}</span> trades
      </h2>

      <ExchangeTrades
        v-if="exchangeId"
        :exchange="exchangeId"/>
    </template>

    <template v-else>
      <div class="filter filter-exchange">
        <label
          class="mb-10 filter-label"
          for="exchanges">Select exchange to filter markets:</label>

        <select
          id="exchanges"
          v-model="selectedExchange"
          class="mb-30"
          name="exchanges"
          @change="updateRoute">
          <option value="">--Choose an exchange--</option>
          <option
            v-for="(item, i) in exchanges"
            :key="i"
            :value="item.exchangeId">
            {{ item.name }}
          </option>
        </select>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
  .filter.filter-exchange {
    max-width: 300px;
    .filter-label {
      display: block;
    }
  }
</style>

<script>

import ExchangeTrades from '@/components/ExchangeTrades'
import { mapActions, mapState } from 'vuex'

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
    return {
      selectedExchange: ''
    }
  },
  computed: {
    ...mapState({
      exchanges: state => state.exchanges.list
    }),
    exchangeId () {
      return this.selectedExchange || this.$route.params.exchangeId
    },
    title () {
      const exchangeId = this.$route.params.exchangeId

      return exchangeId ? `Trades :: ${exchangeId.toUpperCase()}` : 'Trades'
    }
  },
  watch: {
    '$route.params.exchangeId' (value) {
      if (!value) {
        this.selectedExchange = ''
      }
    }
  },
  mounted () {
    if (this.exchanges.length === 0) {
      this.getExchanges()
    }
  },
  methods: {
    ...mapActions({
      getExchanges: 'exchanges/getExchanges'
    }),
    updateRoute () {
      this.$router.push(`/trades/${this.selectedExchange}`)
    }
  }
}
</script>
