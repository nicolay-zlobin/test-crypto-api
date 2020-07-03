<template>
  <button
    class="button-theme"
    @click="toggleTheme">
    <component
      :is="theme === 'dark' ? 'sunIcon' : 'moonStars'"
      width="20px"/>
  </button>
</template>

<style lang="scss">
  .button-theme {
    padding: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--font-color);
    background-color: var(--bg-secondary-color);
    height: 35px;
  }
</style>

<script>
import sunIcon from '@/assets/svg/sun.svg'
import moonStars from '@/assets/svg/moon-stars.svg'

import { mapState } from 'vuex'

export default {
  name: 'ThemeSwitch',
  components: {
    sunIcon,
    moonStars
  },
  data () {
    return {}
  },
  computed: {
    ...mapState({
      theme: state => state.theme
    })
  },
  methods: {
    toggleTheme () {
      const theme = this.theme === 'light' ? 'dark' : 'light'

      this.$store.commit('SET_THEME', theme)
      document.body.setAttribute('data-theme', theme)
    }
  }
}
</script>
