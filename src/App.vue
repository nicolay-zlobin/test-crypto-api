<template>
  <div id="app" class="mt-10">
    <Nav/>

    <router-view/>
  </div>
</template>

<script>
import Nav from '@/components/Nav'

export default {
  name: 'App',
  components: {
    Nav
  },
  data () {
    return {}
  },
  computed: {},
  created () {
    document.body.setAttribute('data-theme', this.$store.state.theme)
  },
  mounted () {
  },
  methods: {}
}
</script>

