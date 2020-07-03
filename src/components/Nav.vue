<template>
  <nav class="nav">
    <div class="nav-left">
      <router-link
        class="brand"
        to="/">
        <wolfIcon width="30px"/>
      </router-link>

      <div class="tabs">
        <router-link exact-active-class="active" to="/">Exchanges</router-link>
        <router-link exact-active-class="active" to="/markets">Markets</router-link>
        <router-link exact-active-class="active" to="/trades">Trades</router-link>
        <!--<router-link exact-active-class="active" to="/about">About</router-link>-->
      </div>
    </div>

    <div class="nav-right">
      <a class="button outline">Button</a>
    </div>
  </nav>
</template>

<style>
  .nav {
    margin-bottom: 16px;
  }
</style>

<script>
import wolfIcon from '@/assets/svg/wolf-pack-battalion.svg'

export default {
  name: 'Nav',
  components: {
    wolfIcon
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
