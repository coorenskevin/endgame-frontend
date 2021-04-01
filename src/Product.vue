<template>
  <div class="col-lg-2 col-md-4 mb-2" style="text-align:center;">
    <div class="card h-100">
        <img class="card-img-top" :src="product.thumbnail_url" alt=""
      />
      <div class="card-body">
        <h4 class="card-title">
          <p>{{ product.title }}</p>
        </h4>
        <h6 class="card-subtitle mb-2 remain">
          {{ product.sold }} already sold
        </h6>
        <p class="card-text">{{ product.description | shortDescription }}</p>
      </div>
      <div class="card-footer">
        <div class="form-inline">
          <h5 class="mr-4">€{{ product.price.toFixed(2) }}</h5>
          <button
            class="btn btn-danger mr-2"
            :disabled="product.quantity === 0"
            @click="removeOneFromCart(product)"
            onclick="showErrorMessOne()"
          >
          <i class="fas fa-minus"></i>
          </button>
          <input
            type="number"
            class="form-control w-25 mr-2"
            disabled
            name="qty"
            :value= product.inBasket 
          />
          <button
            class="btn btn-success"
            :disabled="product.quantity === 0"
            @click="addToCart(product)"
            onclick="showMess()"
          >
            <i class="fas fa-plus"></i>
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
      product.inBasket += 1;
      this.$store.commit("addToCart", product);
    },
    removeOneFromCart(product) {
      if(product.inBasket>0) {
          product.inBasket -= 1;
          this.$store.commit("removeOneFromCart", product);
      }
    }
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
