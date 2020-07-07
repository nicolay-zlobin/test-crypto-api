<template>
  <div class="container">
    <nav class="nav">
      <div class="nav-left">
        <router-link
          class="brand"
          to="/">
          <wolfIcon width="30px"/>
        </router-link>

        <div class="tabs">
          <caretDown
            class="tabs-toggler is-pointer"
            width="22px"
            @click="navIsVisible = !navIsVisible"/>
          <template v-if="navIsVisible">
            <router-link exact-active-class="active" to="/">Exchanges</router-link>
            <router-link active-class="active" to="/markets">Markets</router-link>
            <router-link active-class="active" to="/trades">Trades</router-link>
            <router-link active-class="active" to="/chart">Chart</router-link>
            <router-link active-class="active" to="/about">About</router-link>
          </template>
        </div>
      </div>

      <div class="nav-right">
        <ThemeSwitch/>
      </div>
    </nav>
  </div>
</template>

<style lang="scss">
  .nav {
    margin-bottom: 16px;
    .nav-right {
      margin-right: 16px;
      align-items: center;
      margin-left: 20px;
    }
    @media screen and (max-width: 480px) {
      .nav-right {
        display: none;
      }
    }
  }
  .tabs {
    .tabs-toggler {
      padding: 2px;
    }
    @media screen and (max-width: 479px) {
      flex-direction: column;
      width: 100%;
    }
    @media screen and (min-width: 480px) {
      .tabs-toggler {
        display: none;
      }
    }
  }
</style>

<script>
import wolfIcon from '@/assets/svg/wolf-pack-battalion.svg'
import ThemeSwitch from '@/components/ThemeSwitch'
import caretDown from '@/assets/svg/caret-square-down.svg'

export default {
  name: 'Nav',
  components: {
    wolfIcon,
    ThemeSwitch,
    caretDown
  },
  data () {
    return {
      navIsVisible: window.screen.width > 479
    }
  },
  computed: {},
  mounted () {
    console.log(window.screen.width)
  },
  methods: {}
}
</script>
