<template>
  <div id="toys">
    <div class="row">
      <div class="col-lg-12">
        <div class="row d-flex justify-content-around">
          <div
            class="col-lg-2 col-md-4 mb-2"
            style="text-align:center;"
            v-for="(item, idx) in inCart"
            :key="idx"
          >
            <div class="card h-100">
              <img class="card-img-top" :src="item.thumbnail_url" alt=""/>
              <div class="card-body">
                <h4 class="card-title">
                  <p>{{ item.title }}</p>
                </h4>
                <h6 class="card-subtitle mb-2 remain">
                  {{ item.orderQuantity }} in cart
                </h6>
              </div>
              <div class="card-footer">
                <div class="row d-flex justify-content-around" style="align-items:center;">
                  <h3 class="mb-0">€{{ (item.price * item.orderQuantity).toFixed(2) }}</h3>
                  <button
                    class="btn btn-danger"
                    :disabled="item.quantity === 0"
                    @click="removeFromCart(item)"
                    onclick="showErrorMess()"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /.row -->
      </div>
      <!-- /.col-lg-9 -->
    </div>
    <div>
      <h3 style="color:#45db27;">Total : €{{ total.toFixed(2) }}</h3>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import Product from "@/ProductCart.vue";
export default {
  components: {
    //Product,
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
      console.log("render overview at the end");
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
          let object = cart[index];

          object.orderQuantity += 1;
          console.log("update quantity ", cart[index]);
        }
      });
      return cart;
    },
    numInCart() {
      return this.inCart.length;
    },
    total() {
      return this.inCart.reduce(
        (acc, cur) => acc + cur.price * cur.orderQuantity,
        0
      );
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
    removeFromCart(item) {
      this.$store.commit("removeFromCart", item);
    },
  },
};
</script>
