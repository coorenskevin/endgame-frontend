<template>
  <div class="col-lg-2 col-md-4 mb-2" style="text-align:center;">
    <div class="card h-100">
      <a href="#"
        ><img class="card-img-top" :src="product.thumbnail_url" alt=""
      /></a>
      <div class="card-body">
        <h4 class="card-title">
          <p>{{ product.title }}</p>
        </h4>
        <h6 class="card-subtitle mb-2 remain">
          {{ product.id | inCart }} in cart
        </h6>
      </div>
      <div class="card-footer">
        <div class="form-inline">
          <h5 class="">€{{ product.price * product.orderQuantity }}</h5>
          <button
            style="position : absolute;bottom   : 5px;"
            class="btn btn-sm btn-danger"
            @click="removeFromCart(product)"
            onclick="showErrorMess()"
          >
            &times;
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
    removeFromCart(item) {
      this.$store.commit("removeFromCart", item);
    },
  },
  computed: {},
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
