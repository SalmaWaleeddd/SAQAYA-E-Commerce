<template>
  <div class="categories">
    <div class="categories__header">
      <SectionHeader subtitle="Categories" title="Browse By Category" />
    </div>
    <div class="categories__grid">
      <div
        v-for="category in categories"
        :key="category.id"
        class="categories__grid__item"
      >
        <img :src="category.img" :alt="category.name" class="categories__img" />

        <h3 class="categories__title">{{ category.name }}</h3>
      </div>
    </div>
  </div>
</template>
<script>
import SectionHeader from "@/components/common/SectionHeader.vue";
export default {
  name: "ProductCategories",
  components: {
    SectionHeader,
  },
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.categories {
  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
    gap: 24px;

    &__item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      padding: 16px;
      background-color: transparent;
      border-radius: 8px;
      border: solid 1px rgba(0, 0, 0, 0.3);
      transition: transform 0.3s ease;
      color: #000;

      &:hover {
        transform: translateY(-4px);
        background-color: $color-primary;
        color: $color-app-white;
      }
    }
  }
  &__img {
    width: 50px;
    height: 50px;
    object-fit: contain;
  }
  &__title {
    font-size: 16px;
    font-weight: 400;
    color: inherit;
    margin: 0;
  }
}
</style>
