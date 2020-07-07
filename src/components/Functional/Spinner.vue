<template>
  <div class="spinner">
    <div class="bounce1"/>
    <div class="bounce2"/>
    <div class="bounce3"/>
  </div>
</template>

<script>
export default {
  name: 'Spinner',
  data () {
    return {
      greeting: 'Hello'
    }
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss">
  /*
  <div class="spinner">
    <div class="bounce1"/>
    <div class="bounce2"/>
    <div class="bounce3"/>
  </div>
  */
  .spinner {
    width: 70px;
    text-align: center;
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    > div {
      width: 14px;
      height: 14px;
      background-color: #dce2e6;
      border-radius: 100%;
      display: inline-block;
      animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    }
  }
  .spinner.is-smaller {
    > div {
      width: 12px;
      height: 12px;
    }
  }
  .spinner .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }
  .spinner .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }
  @-webkit-keyframes sk-bouncedelay {
    0%, 80%, 100% {
      -webkit-transform: scale(0)
    }
    40% {
      -webkit-transform: scale(1.0)
    }
  }
  @keyframes sk-bouncedelay {
    0%, 80%, 100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    40% {
      -webkit-transform: scale(1.0);
      transform: scale(1.0);
    }
  }
</style>
