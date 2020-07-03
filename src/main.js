import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/style/bootstrap.scss'
import '@/assets/style/style.scss'

import VueMeta from 'vue-meta'
import axios from 'axios'

Vue.prototype.$http = axios
Vue.use(VueMeta)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
