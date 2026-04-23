<template>
  <div class="categories">
    <div class="categories__header">
      <SectionHeader subtitle="Categories" title="Browse By Category" />
    </div>
    <div class="categories__grid">
      <div
        v-for="(category, index) in categories"
        :key="index"
        class="categories__grid__item"
      >
        <div class="categories__img-wrapper">
          <img
            :src="getCategoryIcon(category)"
            :alt="category"
            class="categories__img"
          />
        </div>
        <h3 class="categories__title">{{ formatCategoryName(category) }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SectionHeader from "@/components/common/SectionHeader.vue";
import { formatCategoryName } from "@/utils/stringUtils";

// Props
interface Props {
  categories: string[];
}

defineProps<Props>();

// Icon mapping
const iconMap: Record<string, string> = {
  smartphones: "📱",
  laptops: "💻",
  furniture: "🪑",
  beauty: "💄",
  fragrances: "🌸",
  groceries: "🛒",
  "home-decoration": "🏠",
  "kitchen-accessories": "🍳",
  "mens-shirts": "👕",
  "mens-shoes": "👞",
  "mens-watches": "⌚",
  "womens-bags": "👜",
  "womens-dresses": "👗",
  "womens-jewellery": "💍",
  "womens-shoes": "👠",
  "womens-watches": "⌚",
  "sports-accessories": "⚽",
  sunglasses: "🕶️",
  tablets: "📟",
  tops: "👚",
  vehicle: "🚗",
  motorcycle: "🏍️",
  "skin-care": "🧴",
  "mobile-accessories": "📱",
};

// Methods
function getCategoryIcon(category: string): string {
  return iconMap[category] || "📦";
}
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
      cursor: pointer;

      &:hover {
        transform: translateY(-4px);
        background-color: $color-primary;
        color: $color-app-white;
      }
    }
  }

  &__img-wrapper {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    font-size: 40px; // For emoji icons
  }

  &__title {
    font-size: 16px;
    font-weight: 400;
    color: inherit;
    margin: 0;
    text-transform: capitalize;
  }
}
</style>
