<template>
  <div>
    <nav id="sidebar-wrapper" style="z-index:5">
      <ul class="sidebar-nav">
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
          <a class="js-scroll-trigger" href="#foodAndDrinks">Food and Drinks</a>
        </li>
        <li class="sidebar-nav-item">
          <a class="js-scroll-trigger" href="#schoolSupplies"
            >School Supplies</a
          >
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
        <li v-if="isAuthenticated" class="li-pointer nav-item">
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {{ getUserName() }}
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="#">Account Settings</a>
              <a @click="onLogoutClicked" class="dropdown-item"
                >Logout {{ userEmail }}</a
              >
            </div>
          </div>
        </li>
        <li>
          <button
            class="btn btn-primary navbar-btn"
            data-toggle="modal"
            data-target="#shoppingCart"
          >
            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
            ( {{ numInCart }} )
          </button>
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
            <button class="close" data-dismiss="modal">
              &times;
            </button>
          </div>
          <div class="modal-body">
            <table class="table">
              <tbody>
                <tr v-for="(item, idx) in inCart" :key="idx">
                  <td>{{ item.title }}</td>
                  <td>€{{ item.price }}</td>
                  <td>
                    <button
                      class="btn btn-sm btn-danger"
                      @click="removeFromCart(item)"
                    >
                      &times;
                    </button>
                  </td>
                </tr>
                <tr>
                  <th></th>
                  <th>€{{ total }}</th>
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
      return this.$store.getters.inCart;
    },
    numInCart() {
      return this.inCart.length;
    },
    total() {
      return this.inCart.reduce((acc, cur) => acc + cur.price, 0);
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
