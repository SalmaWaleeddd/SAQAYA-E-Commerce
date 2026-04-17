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

<script lang="ts">
import promotionImg from "@/assets/images/promotion.svg";
import AppleLogo from "@/assets/icons/apple-logo-icon.svg";
import { TRUST_BADGES } from "@/constants/trustBadges";
import PromotionCarousel from "@/components/promotions/PromotionCarousel.vue";
import FlashSales from "@/components/home/FlashSales.vue";
import ProductCategories from "@/components/product/ProductCategories.vue";
import ExploreProducts from "@/components/home/ExploreProducts.vue";
import TrustBadge from "@/components/common/TrustBadge.vue";
import { mapGetters, mapActions } from "vuex";
import { formatCategoryName } from "@/utils/stringUtils";
import { Product } from "@/types/product";

// Constants
const FLASH_SALES_COUNT = 6;
const EXPLORE_PRODUCTS_COUNT = 9;
const MAX_CATEGORIES = 6;

type HomeViewInstance = {
  randomFlashSales: Product[];
  error: string | null;
  allProducts: Product[];
  categories: string[];
  fetchProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  loadHomeData: () => Promise<void>;
  shuffleArray: <T>(array: T[]) => T[];
};

export default {
  name: "HomeView",
  components: {
    PromotionCarousel,
    FlashSales,
    ProductCategories,
    ExploreProducts,
    TrustBadge,
  },
  data() {
    return {
      promotionImg,
      AppleLogo,
      promotionList: [
        {
          title: "iPhone 14 Series",
          subtitle: "Up to 10% off Voucher",
          img: promotionImg,
          icon: AppleLogo,
        },
        {
          title: "iPhone 14 Series",
          subtitle: "Up to 10% off Voucher",
          img: promotionImg,
          icon: AppleLogo,
        },
        {
          title: "iPhone 14 Series",
          subtitle: "Up to 10% off Voucher",
          img: promotionImg,
          icon: AppleLogo,
        },
      ],
      badges: TRUST_BADGES,
      randomFlashSales: [] as Product[],
      error: null as string | null,
    };
  },
  computed: {
    ...mapGetters("products", ["allProducts", "categories"]),

    categoryList(): string[] {
      const vm = this as unknown as HomeViewInstance;
      if (!vm.categories?.length) {
        return [
          "Electronics",
          "Fashion",
          "Home & Garden",
          "Sports",
          "Toys",
          "Beauty",
        ];
      }
      return vm.categories
        .slice(0, MAX_CATEGORIES)
        .map((category: string) => formatCategoryName(category));
    },

    randomFlashSalesProducts(): Product[] {
      const vm = this as unknown as HomeViewInstance;
      if (vm.randomFlashSales.length) return vm.randomFlashSales;
      if (!vm.allProducts?.length) return [];

      return vm.shuffleArray([...vm.allProducts]).slice(0, FLASH_SALES_COUNT);
    },

    exploreProducts(): Product[] {
      const vm = this as unknown as HomeViewInstance;
      if (!vm.allProducts?.length) return [];
      return vm.allProducts.slice(0, EXPLORE_PRODUCTS_COUNT);
    },
  },
  methods: {
    ...mapActions("products", ["fetchProducts", "fetchCategories"]),

    shuffleArray<T>(array: T[]): T[] {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    },

    async loadHomeData(): Promise<void> {
      const vm = this as unknown as HomeViewInstance;
      vm.error = null;

      try {
        await vm.fetchCategories();
        await vm.fetchProducts();

        // Randomize flash sales after products are loaded
        if (vm.allProducts?.length) {
          vm.randomFlashSales = vm
            .shuffleArray([...vm.allProducts])
            .slice(0, FLASH_SALES_COUNT);
        }
      } catch (error: any) {
        vm.error = error.message || "Failed to load home data";
        console.error("Failed to load home data:", error);
      }
    },
  },
  mounted(): void {
    const vm = this as unknown as HomeViewInstance;
    vm.loadHomeData();
  },
};
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
