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

<script setup lang="ts">
import { Product } from "@/types/product";
import ProductCard from "./ProductCard.vue";
import { useCartStore } from "@/stores/useCartStore";

// Props
defineProps<{
  products: Product[];
}>();

// Store
const { addToCart, openCart } = useCartStore();

// Methods
function handleAddToCart(product: Product) {
  addToCart(product, 1);
  openCart();
}
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
