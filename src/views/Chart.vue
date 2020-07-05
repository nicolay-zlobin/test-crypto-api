<template>
  <div class="container">
    <p v-if="!market">
      Choose market
      <router-link to="/trades">here</router-link>
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
  metaInfo () {
    return {
      title: this.title
    }
  },
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
    },
    title () {
      const market = this.market

      return market
        ? `Chart :: ${market[0].toUpperCase()} ${market[1].toUpperCase()}/${market[2].toUpperCase()}`
        : 'Chart'
    }
  },
  mounted () {
  },
  methods: {}
}
</script>
