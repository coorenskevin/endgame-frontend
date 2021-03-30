import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const url = "http://localhost:8000/products";
const headers = { Accept: "application/json" };

export default new Vuex.Store({
  state: {
    products: [],
    foodProducts: [],
    inCart: [],
    user: {
      isAuthenticated: false,
      name: "",
      email: "",
      idToken: ""
    },
    endpoints: {
      login: "http://localhost:3000/login"
    },
   },
   getters: {
    products: state => state.products,
    foodProducts: state => state.foodProducts,
    inCart: state => state.inCart,
   },
   mutations: { //synchronous
     setProducts(state, payload) {
       const foodProducts = [];
       const products = [];
       payload.forEach((prod) => {
         if (prod.category == "food") {
           foodProducts.push(prod);
         } else {
           products.push(prod);
         }
       });

       state.products = products;
       state.foodProducts = foodProducts;
     },
     addToCart(state, payload) {
      console.log(payload);
      state.inCart.push(payload);
     },
     removeFromCart(state, item) {
       state.inCart.splice(item, 1);
     },
     logout(state) {
      state.user.isAuthenticated = false;
      state.user.name = "";
      state.user.email ="";
      state.user.idToken ="";
     },
     login(state, payload) {
      state.user.isAuthenticated = true;
      state.user.name = payload.name;
      state.user.email =payload.email;
      state.user.idToken =payload.idToken;
     },
   },
   actions: { //asynchronous
     async getProducts(state) {
       const products = await fetch(url, { headers });
       const prods = await products.json();
       state.commit("setProducts", prods);
       console.log(prods);
     }
   },
  modules: {
  }
})
