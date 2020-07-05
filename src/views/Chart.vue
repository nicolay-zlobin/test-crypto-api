<template>
  <div class="container">
    <p v-if="!market">
      Choose market
      <router-link to="/markets">here</router-link>
      to draw chart
    </p>

    <ChartOHLC v-if="market" :market="market"/>
  </div>
</template>

<style scoped lang="scss">

</style>

<script>
import ChartOHLC from '@/components/ChartOHLC'

export default {
  name: 'Chart',
  components: {
    ChartOHLC
  },
  props: {
    type: {
      type: String,
      default: 'main'
    }
  },
  data () {
    return {}
  },
  computed: {
    market () {
      const market = this.$route.params.market

      return market ? market.split('-') : ''
    }
  },
  mounted () {
  },
  methods: {}
}
</script>
