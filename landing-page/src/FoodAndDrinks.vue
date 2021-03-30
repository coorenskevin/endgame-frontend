<template>
  <div id="foodAndDrinks">
  <!-- Food and drinks -->
    <section class="content-section bg-light pl-5 pr-5" id="foodAndDrinks">
    <div class="container text-center">
        <div class="row">
            <div class="col-lg-10 mx-auto">
                <h2>Food and Drinks</h2>
                <p class="lead mb-5">All of these products have an expiration date far away in the future. This way
                    people in need of food certainly won't eat expired food.</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="row d-flex justify-content-around">

            <Product v-for="product in products"
            :key="product.id"
            :product="product"/>

            </div>
            <!-- /.row -->

        </div>
        <!-- /.col-lg-9 -->

    </div>
    <!-- /.row -->
    <div class="text-center">
        <a class="btn btn-dark btn-xl js-scroll-trigger mr-2" href="#landing">Previous</a>
        <a class="btn btn-dark btn-xl js-scroll-trigger" href="#schoolSupplies">Next</a>
    </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import Product from "@/Product.vue"
export default {
  components: {
    Product
  },
  mounted(){
    this.$store.dispatch("getProducts");
  },
  computed: {
    products() {
      return this.$store.state.foodProducts;
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
