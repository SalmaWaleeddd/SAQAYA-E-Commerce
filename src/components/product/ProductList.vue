<template>
  <div class="product-list">
    <div class="product-list__container">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Product } from "@/types/product";
import { PropType } from "vue";

export default {
  name: "ProductList",
  components: {
    ProductCard: () => import("@/components/product/ProductCard.vue"),
  },
  props: {
    products: {
      type: Array as PropType<Product[]>,
      required: true,
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
