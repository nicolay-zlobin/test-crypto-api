<template>
  <MarketsList/>
</template>

<style scoped lang="scss">
</style>

<script>
import MarketsList from '@/components/MarketsList'

export default {
  name: 'Markets',
  metaInfo () {
    return {
      title: 'Markets'
    }
  },
  components: {
    MarketsList
  },
  data () {
    return {}
  },
  computed: {},
  mounted () {
  },
  methods: {}
}
</script>
