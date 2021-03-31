import Vue from "vue";
import App from "./App.vue";
import Nav from "./Nav.vue";
import FoodAndDrinks from "./FoodAndDrinks.vue";
import SchoolSupplies from "./SchoolSupplies.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

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
  render: (h) => h(App),
}).$mount("#app");
