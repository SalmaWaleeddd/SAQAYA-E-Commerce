<template>
  <div class="explore-products">
    <div class="explore-products__header">
      <SectionHeader subtitle="Our Products" title="Explore Our Products" />
    </div>
    <ProductList :products="products" />
    <div class="explore-products__view-all">
      <BaseButton text="View All Products" variant="primary" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ExploreProducts",
  components: {
    SectionHeader: () => import("@/components/common/SectionHeader.vue"),
    ProductList: () => import("@/components/product/ProductList.vue"),
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
.explore-products {
  &__view-all {
    display: flex;
    justify-content: center;
    margin-top: 35px;
  }
}
</style>
