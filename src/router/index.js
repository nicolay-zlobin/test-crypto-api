import Vue from 'vue'
import VueRouter from 'vue-router'
import Exchanges from '../views/Exchanges.vue'
import Markets from '../views/Markets.vue'
import Trades from '../views/Trades.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Exchanges',
    component: Exchanges
  },
  {
    path: '/markets',
    name: 'Markets',
    component: Markets
  },
  {
    path: '/trades',
    name: 'Trades',
    component: Trades
  },
  {
    path: '/trades/:exchangeId',
    name: 'TradesExchange',
    component: Trades
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
