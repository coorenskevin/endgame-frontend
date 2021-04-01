<template>
  <div>
    <nav id="sidebar-wrapper" style="z-index:5">
      <ul class="sidebar-nav">
        <li class="sidebar-brand">
          <a class="js-scroll-trigger" href="#page-top">{{ getUserName() }}</a>
        </li>
        <li class="sidebar-nav-item" style="display: none;" id="showCart">
          <a class="" data-toggle="modal" data-target="#shoppingCart">
            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
            ( {{ numInCart }} )
          </a>
        </li>
        <li class="sidebar-nav-item disabled" id="showCartAlert">
          <a onclick="alert('Cart is still empty!');">
            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
            ( {{ numInCart }} )
          </a>
        </li>

        <router-link
          to="/"
          tag="li"
          v-if="!isAuthenticated"
          class="sidebar-nav-item"
          active-class="active"
        >
          <a @click="onLoginClicked" class="nav-link">Login</a>
        </router-link>

        <li v-if="isAuthenticated" class="sidebar-nav-item">
          <a @click="onLogoutClicked" class="nav-link"
            >Logout {{ userEmail }}</a
          >
        </li>
        <li class="sidebar-brand">
          <a class="js-scroll-trigger" href="#page-top">Charity box</a>
        </li>
        <li class="sidebar-nav-item">
          <a class="js-scroll-trigger" href="#landing">Home</a>
        </li>
        <li class="sidebar-nav-item">
          <a class="js-scroll-trigger" href="#chooseCharity"
            >Pick your charity</a
          >
        </li>
        <li class="sidebar-nav-item">
          <a class="js-scroll-trigger" href="#foodsection">Food and Drinks</a>
        </li>
        <li class="sidebar-nav-item">
          <a class="js-scroll-trigger" href="#schoolsection">School Supplies</a>
        </li>
        <li class="sidebar-nav-item">
          <a class="js-scroll-trigger" href="#toysection">Toys</a>
        </li>

        <!--need next links?
      <li class="sidebar-nav-item">
          <a class="js-scroll-trigger" href="#portfolio">Portfolio</a>
      </li>
      <li class="sidebar-nav-item">
          <a class="js-scroll-trigger" href="#contact">Contact</a>
      </li>
      --></ul>
    </nav>

    <div id="shoppingCart" class="modal fade">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <i class="fa fa-shopping-cart" aria-hidden="true"></i>
              Shopping cart
            </h5>
            <button class="close" data-dismiss="modal" id="modalCloseButton">
              &times;
            </button>
          </div>
          <div class="modal-body">
            <table class="table">
              <tbody>
                <tr v-for="(item, idx) in inCart" :key="idx">
                  <td>{{ item.title }}</td>
                  <td>{{ item.orderQuantity }}</td>
                  <td>€{{ (item.price * item.orderQuantity).toFixed(2) }}</td>
                  <td>
                    <button
                      class="btn btn-sm btn-danger"
                      @click="removeFromCart(item)"
                      onclick="showErrorMess()"
                    >
                      &times;
                    </button>
                  </td>
                </tr>
                <tr>
                  <th></th>
                  <th>€{{ total.toFixed(2) }}</th>
                  <th></th>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-dismiss="modal">
              Keep shopping
            </button>
            <button class="btn btn-primary" @click="checkout()">
              Check out
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  name: "NavHeader",
  computed: {
    userEmail() {
      return this.isLoggedIn ? this.currentUser.email : "";
    },
    isAuthenticated() {
      return this.$store.state.user.isAuthenticated;
    },
    inCart() {
      console.log(this.$store.getters.inCart);
      let cart = [];
      let localCart = this.$store.getters.inCart;
      console.log("beforeloop", localCart);

      localCart.forEach(function(prop) {
        console.log("loop ", prop);
        let index = cart.indexOf(prop);
        if (index == -1) {
          prop.orderQuantity = 1;
          cart.push(prop);
        } else {
          console.log("update quantity");
          let object = cart[index];

          object.orderQuantity += 1;
        }
      });

      return cart;
    },
    numInCart() {
      return this.inCart.length;
    },
    total() {
      return this.inCart.reduce((acc, cur) => acc + cur.price * cur.orderQuantity, 0);
    },
  },
  methods: {
    onLoginClicked() {
      window.location = this.$store.state.endpoints.login;
    },
    onLogoutClicked() {
      this.$store.commit("logout");
    },
    getUserName() {
      return this.$store.state.user.name;
    },
    removeFromCart(item) {
      this.$store.commit("removeFromCart", item);
    },
    checkout() {
      if (this.isAuthenticated) {
        if (this.numInCart == 0) {
          alert("Your cart is empty!");
          return;
        }
      } else {
        alert("Please login to checkout");
        return;
      }
    },
  },
};
</script>
