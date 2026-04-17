<template>
  <div class="product-list">
    <div class="product-list__container">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add-to-cart="handleAddToCart"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Product } from "@/types/product";
import ProductCard from "./ProductCard.vue";
import { PropType } from "vue";
import { mapActions } from "vuex";

export default {
  name: "ProductList",
  components: {
    ProductCard,
  },
  props: {
    products: {
      type: Array as PropType<Product[]>,
      required: true,
    },
  },
  methods: {
    ...mapActions("cart", ["addToCart"]),

    handleAddToCart(product: Product) {
      (this as any).addToCart({
        product: product,
        quantity: 1,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.product-list {
  &__container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 24px;
  }
}
</style>
