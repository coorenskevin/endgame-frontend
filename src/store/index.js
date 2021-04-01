import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const url = "http://endgame-backend-git-ucllteam17.ocp-ucll-40cb0df2b03969eabb3fac6e80373775-0000.eu-de.containers.appdomain.cloud/api/products/all";
const headers = { Accept: "application/json" };

export default new Vuex.Store({
  state: {
    products: [],
    foodProducts: [],
    schoolProducts: [],
    toyProducts: [],
    inCart: [],
    user: {
      isAuthenticated: false,
      name: "",
      email: "",
      idToken: "",
    },
    endpoints: {
      login: "http://endgame-authentication-ucllteam17.ocp-ucll-40cb0df2b03969eabb3fac6e80373775-0000.eu-de.containers.appdomain.cloud/login",
    },
  },
  getters: {
    products: (state) => state.products,
    foodProducts: (state) => state.foodProducts,
    schoolProducts: (state) => state.schoolProducts,
    toyProducts: (state) => state.toyProducts,
    inCart: (state) => state.inCart,
  },
  mutations: {
    //synchronous
    setProducts(state, payload) {
      const foodProducts = [];
      const schoolProducts = [];
      const toyProducts = [];
      const products = [];
      payload.forEach((prod) => {
        if (prod.category == "food") {
          foodProducts.push(prod);
        } else if(prod.category == "school") {
          schoolProducts.push(prod);
        } else if(prod.category == "toy") {
          toyProducts.push(prod);
        }
      });

      state.products = products;
      state.foodProducts = foodProducts;
      state.schoolProducts = schoolProducts;
      state.toyProducts = toyProducts;
    },
    addToCart(state, payload) {
      let index = state.inCart.indexOf(payload);
      if(index == -1) {
        payload.orderQuantity = 1;
        state.inCart.push(payload);
      } else {
        console.log("update quantity");
        let object = state.inCart[index];
        
        object.orderQuantity += 1;
        console.log(state.inCart[index]);
      }
    },
    removeFromCart(state, item) {
      state.inCart.splice(item, 1);
    },
    logout(state) {
      state.user.isAuthenticated = false;
      state.user.name = "";
      state.user.email = "";
      state.user.idToken = "";
    },
    login(state, payload) {
      state.user.isAuthenticated = true;
      state.user.name = payload.name;
      state.user.email = payload.email;
      state.user.idToken = payload.idToken;
    },
  },
  actions: {
    //asynchronous
    async getProducts(state) {
      const products = await fetch(url, { headers });
      const prods = await products.json();
      state.commit("setProducts", prods);
      console.log(prods);
    },
  },
  modules: {},
});
