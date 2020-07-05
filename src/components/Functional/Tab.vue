<template>
  <div v-show="isActive">
    <slot/>
  </div>
</template>

<script>

export default {
  name: 'Tab',
  components: {},
  props: {
    name: {
      type: String,
      required: true
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isActive: false
    }
  },
  computed: {
    href () {
      return '#' + this.name.toLowerCase().replace(/ /g, '-')
    }
  },
  mounted () {
    if (location.hash) {
      this.isActive = this.href === location.hash
    }
    else {
      this.isActive = this.selected
    }
  },
  methods: {}
}
</script>
