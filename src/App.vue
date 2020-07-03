<template>
  <div id="app">
    <nav class="nav">
      <div class="nav-left">
        <a class="brand" href="#">Brand</a>

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

    <router-view/>
  </div>
</template>

<style lang="scss">
</style>
