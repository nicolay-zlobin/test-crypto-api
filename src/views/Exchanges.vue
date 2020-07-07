<template>
  <ExchangesList/>
</template>

<script>
import ExchangesList from '@/components/ExchangesList'

export default {
  name: 'Exchanges',
  metaInfo () {
    return {
      title: 'Exchanges'
    }
  },
  components: {
    ExchangesList
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
