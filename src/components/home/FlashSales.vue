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
import ProductList from "@/components/product/ProductList.vue";
import SectionHeader from "@/components/common/SectionHeader.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
export default {
  name: "FlashSales",
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
.flash-sales {
  &__view-all {
    display: flex;
    justify-content: center;
    margin-top: 35px;
  }
}
</style>
