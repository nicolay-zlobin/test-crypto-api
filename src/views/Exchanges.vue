<template>
  <div>
    <ExchangesList/>
  </div>
</template>

<style scoped lang="scss">
</style>

<script>
import ExchangesList from '@/components/ExchangesList'

export default {
  name: 'Exchanges',
  components: {
    ExchangesList
  },
  metaInfo () {
    return {
      title: 'Exchanges'
    }
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
