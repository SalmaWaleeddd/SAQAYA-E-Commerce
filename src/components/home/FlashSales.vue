<template>
  <div class="flash-sales">
    <div class="flash-sales__header">
      <SectionHeader subtitle="Today's" title="Flash Sales" />
    </div>
    <div class="flash-sales__products-grid">
      <ProductList :products="products" />
    </div>
    <div class="flash-sales__view-all">
      <BaseButton text="View All Products" variant="primary" />
    </div>
  </div>
</template>

<script>
import ProductList from "../product/ProductList.vue";

export default {
  name: "FlashSales",
  components: {
    SectionHeader: () => import("@/components/common/SectionHeader.vue"),
    ProductList,
    BaseButton: () => import("@/components/ui/BaseButton.vue"),
  },
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.flash-sales {
  &__view-all {
    display: flex;
    justify-content: center;
    margin-top: 35px;
  }
}
</style>
