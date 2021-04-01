<template>
  <div id="toys">
    <div class="row">
      <div class="col-lg-12">
        <div class="row d-flex justify-content-around">
          <Product
              v-for="(item, idx) in inCart" :key="idx" :product="item"
          />
        </div>
        <!-- /.row -->
      </div>
      <!-- /.col-lg-9 -->
    </div>
    <div>
      <p>Total : €{{ total }}</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Product from "@/ProductCart.vue";
export default {
  components: {
    Product,
  },
  name: "Cart",
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
