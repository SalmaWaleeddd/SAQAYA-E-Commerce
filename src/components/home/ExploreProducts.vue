<template>
  <div class="explore-products">
    <div class="explore-products__header">
      <SectionHeader subtitle="Our Products" title="Explore Our Products" />
    </div>
    <ProductList :products="products" />
  </div>
</template>

<script>
export default {
  name: 'ExploreProducts',
    components: {
        SectionHeader: () => import("@/components/common/SectionHeader.vue"),
        ProductList: () => import("@/components/product/ProductList.vue"),
    },
  props: {
    products: {
      type: Array,
      required: true,
    },
  }
}
</script>
