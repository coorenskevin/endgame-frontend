<template>
  <div id="foodAndDrinks">
    <div class="row">
          <div class="col-lg-12">
            <div class="row d-flex justify-content-around">
              <Product
                v-for="product in products"
                :key="product.id"
                :product="product"
              />
            </div>
            <!-- /.row -->
          </div>
          <!-- /.col-lg-9 -->
        </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Product from "@/Product.vue";
export default {
  components: {
    Product,
  },
  mounted() {
    
  },
  computed: {
    products() {
      return this.$store.state.foodProducts;
    },
  },
};
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
