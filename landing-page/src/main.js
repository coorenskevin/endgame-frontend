import Vue from 'vue'
import App from './App.vue'
import Nav from './Nav.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(Nav)
}).$mount('#custom-nav')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
