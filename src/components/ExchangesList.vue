<template>
  <div class="container">
    {{ loading }}
  </div>
</template>

<style scoped lang="scss">

</style>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ExchangesList',
  components: {},
  data () {
    return {}
  },
  computed: {
    ...mapState({
      exchanges: state => state.exchanges.list,
      loading: state => state.exchanges.loading
    })
  },
  mounted () {
    this.getExchanges()
  },
  methods: {
    ...mapActions({
      getExchanges: 'exchanges/getExchanges',
      getMarkets: 'markets/getMarkets'
    })
  }
}
</script>
