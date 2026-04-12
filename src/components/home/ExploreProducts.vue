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
import  SectionHeader  from "@/components/common/SectionHeader.vue";
import  ProductList  from "@/components/product/ProductList.vue";
import  BaseButton  from "@/components/ui/BaseButton.vue";
export default {
  name: "ExploreProducts",
  components: {
    SectionHeader,
    ProductList,
    BaseButton,
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
