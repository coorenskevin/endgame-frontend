import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

var url;
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
      login: "http://localhost:3000/login",
      products: "http://localhost:8000/api/products/all",
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
        } else if (prod.category == "school") {
          schoolProducts.push(prod);
        } else if (prod.category == "toy") {
          toyProducts.push(prod);
        }
      });

      state.products = products;
      state.foodProducts = foodProducts;
      state.schoolProducts = schoolProducts;
      state.toyProducts = toyProducts;
    },
    addToCart(state, payload) {
      document.getElementById("showBoxButton").style.display = "none";
      document.getElementById("showBoxLink").style.display = "inline-block";
      document.getElementById("showCartAlert").style.display = "none";
      document.getElementById("showCart").style.display = "block";

      let index = state.inCart.indexOf(payload);
      if (index == -1) {
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
      if (state.inCart.length <= 0) {
        document.getElementById("showBoxLink").style.display = "none";
        document.getElementById("showBoxButton").style.display = "inline-block";
        document.getElementById("showCart").style.display = "none";
        document.getElementById("showCartAlert").style.display = "block";
        document.getElementById("modalCloseButton").click();
      }
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
    setUrls(state) {
      state.endpoints.login = process.env.VUE_APP_AUTH_URL;
      state.endpoints.products = process.env.VUE_APP_PRODUCTS_URL;
      url = state.endpoints.products;
      console.log(process.env);
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
