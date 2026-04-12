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
import { SectionHeader } from "@/components/common";
import { ProductList } from "@/components/product";
export default {
  name: "ExploreProducts",
  components: {
    SectionHeader,
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
.explore-products {
  &__view-all {
    display: flex;
    justify-content: center;
    margin-top: 35px;
  }
}
</style>
