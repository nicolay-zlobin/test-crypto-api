<template>
  <div>
    <div class="tabs">
      <a
        v-for="(tab, i) in tabs"
        :key="i"
        :href="tab.href"
        :class="{ 'active': tab.isActive }"
        @click="selectTab(tab)">
        {{ tab.name }}
      </a>
    </div>

    <div class="tabs-details">
      <slot/>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>

<script>

export default {
  name: 'Tabs',
  components: {},
  data () {
    return {
      tabs: []
    }
  },
  computed: {},
  created () {
    this.tabs = this.$children
  },
  methods: {
    selectTab (selectedTab) {
      this.tabs.forEach(tab => {
        // const tabName = '#' + selectedTab.name.toLowerCase().replace(/ /g, '-')
        // console.log(tabName, location.hash, location.hash === tabName)

        tab.isActive = (tab.name === selectedTab.name)
      })
    }
  }
}
</script>
