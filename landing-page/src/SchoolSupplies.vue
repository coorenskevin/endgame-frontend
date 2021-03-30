<template>
  <div id="schoolSupplies">
  <!-- School supplies -->
  <section class="content-section bg-primary text-center" id="schoolSupplies">
  <div class="container text-center text-white">
      <div class="row">
          <div class="col-lg-10 mx-auto">
              <h2>School Supplies</h2>
              <p class="lead mb-5">All of these products have an expire date far away in the future. This way the
                  people in need of the food will certainly not eat expired food.</p>

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
  <div class="text-center">
      <a class="btn btn-dark btn-xl js-scroll-trigger" href="#foodAndDrinks">Previous</a>
      <!--  no next <a class="btn btn-dark btn-xl js-scroll-trigger" href="#callout">Next</a>-->
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
      return this.$store.state.products;
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
