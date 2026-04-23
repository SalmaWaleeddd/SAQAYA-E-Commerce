<template>
  <div class="home-page">
    <div v-if="error" class="home-page__error">
      <p>{{ error }}</p>
      <button @click="loadHomeData">Retry</button>
    </div>

    <template v-else>
      <div class="home-page__promotion">
        <PromotionCarousel
          :promotions="promotionList"
          :autoPlay="true"
          :autoPlayInterval="5000"
        />
      </div>
      <!-- Flash Sales Section -->
      <div class="home-page__flash-sales">
        <FlashSales :products="randomFlashSalesProducts" />
      </div>
      <!-- Browse By Category Section -->
      <div class="home-page__categories">
        <ProductCategories :categories="categoryList" />
      </div>
      <!-- Explore Our Products Section -->
      <div class="home-page__explore-products">
        <ExploreProducts :products="exploreProducts" />
      </div>
      <!-- Trust Badges Section -->
      <div class="home-page__trust-badges">
        <TrustBadge v-for="badge in badges" :key="badge.title" :badge="badge" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useProductsStore } from "@/stores/useProductStore";
import { formatCategoryName } from "@/utils/stringUtils";
import { PROMOTIONS } from "@/constants/promotions";
import { TRUST_BADGES } from "@/constants/trustBadges";
import { FLASH_SALES_COUNT, EXPLORE_PRODUCTS_COUNT, MAX_CATEGORIES } from "@/constants/products";
import PromotionCarousel from "@/components/promotions/PromotionCarousel.vue";
import FlashSales from "@/components/home/FlashSales.vue";
import ProductCategories from "@/components/product/ProductCategories.vue";
import ExploreProducts from "@/components/home/ExploreProducts.vue";
import TrustBadge from "@/components/common/TrustBadge.vue";

// Store
const productsStore = useProductsStore();
const { allProducts, categories } = storeToRefs(productsStore);
const { fetchProducts, fetchCategories } = productsStore;

// Local state
const randomFlashSales = ref<any[]>([]);
const error = ref<string | null>(null);
const promotionList = ref(PROMOTIONS);
const badges = ref(TRUST_BADGES);

// Computed
const categoryList = computed(() => {
  if (!categories.value?.length) {
    return [
      "Electronics",
      "Fashion",
      "Home & Garden",
      "Sports",
      "Toys",
      "Beauty",
    ];
  }
  return categories.value
    .slice(0, MAX_CATEGORIES)
    .map((category: string) => formatCategoryName(category));
});

const randomFlashSalesProducts = computed(() => randomFlashSales.value);

const exploreProducts = computed(() => {
  if (!allProducts.value?.length) return [];
  return allProducts.value.slice(0, EXPLORE_PRODUCTS_COUNT);
});

// Methods
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

async function loadHomeData(): Promise<void> {
  error.value = null;

  try {
    await Promise.all([fetchCategories(), fetchProducts()]);

    // Randomize flash sales after products are loaded
    if (allProducts.value?.length) {
      randomFlashSales.value = shuffleArray([...allProducts.value])
        .slice(0, FLASH_SALES_COUNT);
    }
  } catch (err: any) {
    error.value = err.message || "Failed to load home data";
    console.error("Failed to load home data:", err);
  }
}

// Lifecycle
onMounted(() => {
  loadHomeData();
});
</script>

<style lang="scss" scoped>
.home-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  margin-bottom: 40px;

  &__promotion {
    margin-bottom: 60px;
  }

  &__flash-sales,
  &__categories,
  &__explore-products {
    margin-bottom: 60px;
  }

  &__trust-badges {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5rem;
  }

  &__error {
    text-align: center;
    padding: 60px 20px;
    background: #fef2f2;
    border-radius: 8px;
    margin: 40px auto;
    max-width: 500px;

    p {
      color: #dc2626;
      margin-bottom: 20px;
      font-size: 16px;
    }

    button {
      background: #dc2626;
      color: white;
      border: none;
      padding: 10px 24px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      transition: background 0.2s;

      &:hover {
        background: #b91c1c;
      }
    }
  }
}

@media (max-width: 768px) {
  .home-page {
    padding: 16px;

    &__trust-badges {
      flex-direction: column;
      gap: 2rem;
    }

    &__error {
      margin: 20px;
      padding: 40px 16px;
    }
  }
}
</style>