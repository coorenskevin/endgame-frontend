import Vue from "vue";
import Nav from "./Nav.vue";
import FoodAndDrinks from "./FoodAndDrinks.vue";
import SchoolSupplies from "./SchoolSupplies.vue";
import Toys from "./Toys.vue";
import Cart from "./Cart.vue";
import router from "./router";
import store from "./store";
import App from "./App.vue";
import LoadScript from 'vue-plugin-load-script';
import 'bootstrap'
 
Vue.use(LoadScript);

Vue.config.productionTip = false;
Vue.loadScript("js/stylish-portfolio.min.js")

new Vue({
  router,
  store,
  render: (h) => h(Nav),
}).$mount("#custom-nav");

new Vue({
  router,
  store,
  render: (h) => h(FoodAndDrinks),
}).$mount("#foodAndDrinks");

new Vue({
  router,
  store,
  render: (h) => h(SchoolSupplies),
}).$mount("#schoolSupplies");

new Vue({
  router,
  store,
  render: (h) => h(Toys),
}).$mount("#toys");

new Vue({
  router,
  store,
  render: (h) => h(Cart),
}).$mount("#cart");

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");


