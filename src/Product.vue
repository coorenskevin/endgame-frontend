<template>
  <div class="col-lg-2 col-md-4 mb-2" style="text-align:center;">
    <div class="card h-100">
      <a href="#"
        ><img class="card-img-top" :src="product.thumbnail_url" alt=""
      /></a>
      <div class="card-body">
        <h4 class="card-title">
          <a href="#">{{ product.title }}</a>
        </h4>
        <h6 class="card-subtitle mb-2 remain">
          {{ product.sold }} already sold
        </h6>
        <p class="card-text">{{ product.description | shortDescription }}</p>
      </div>
      <div class="card-footer">
        <div class="form-inline">
          <h5 class="mr-2">€{{ product.price }}</h5>
          <input
            type="number"
            class="form-control w-50 mr-2"
            name="qty"
            value="1"
          />
          <button
            class="btn btn-success"
            :disabled="product.quantity === 0"
            @click="addToCart(product)"
            onclick="showMess()"
          >
            <i class="fas fa-shopping-cart"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "product",
  props: ["product"],
  data() {
    return {
      size: "",
    };
  },
  filters: {
    shortDescription(value) {
      if (value && value.length > 70) {
        return value.substring(0, 70) + "...";
      } else {
        return value;
      }
    },
  },
  methods: {
    addToCart(product) {
      this.$store.commit("addToCart", product);
    },
  },
};
</script>

<style scoped>
.remain {
  color: #d17581;
}

.grow {
  width: 90%;
  height: 90%;
  padding: 15px;
  transition: all 0.2s ease-in-out;
}

.grow:hover {
  transform: scale(1.1);
}

.item {
  display: flex;
  content: "";
  padding: 10px 10px;
}
</style>
