<template>
  <transition
    :name="animationName"
    mode="out-in">
    <tr :key="`${trade.price}_${Math.random()}`">
      <slot/>
    </tr>
  </transition>
</template>

<style lang="scss">
  .fade-red-enter-active {
    transition: background 1s ease;
  }
  .fade-red-enter, .slide-fade-leave-to {
    background: var(--sell-color);
  }
  .fade-green-enter-active {
    transition: background 1s ease;
  }
  .fade-green-enter, .slide-fade-leave-to {
    background: var(--buy-color);
  }
</style>

<script>

export default {
  name: 'ExchangeTradeRow',
  components: {},
  props: {
    trade: {
      type: Object,
      required: true,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      animationName: ''
    }
  },
  computed: {},
  watch: {
    'trade.direction' (value) {
      this.animationName = value === 'buy' ? 'fade-green' : 'fade-red'
    }
  },
  mounted () {
  },
  methods: {}
}
</script>
