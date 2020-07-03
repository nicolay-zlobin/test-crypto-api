<template>
  <div id="app">
    <nav class="navbar navbar-dark bg-dark">
      <ul class="nav">
        <li class="nav-item">
          <a
            class="nav-link active"
            href="/exchanges">/exchanges</a>
        </li>

        <li class="nav-item">
          <a
            class="nav-link"
            href="/markets">/markets</a>
        </li>

        <li class="nav-item">
          <a
            class="nav-link"
            href="/trades">/trades</a>
        </li>

        <li class="nav-item">
          <a
            class="nav-link"
            href="/about">/about</a>
        </li>
      </ul>
    </nav>

    <router-view/>
  </div>
</template>

<style lang="scss">
  .nav-link {
    font-family: $font-family-monospace;
  }
</style>
