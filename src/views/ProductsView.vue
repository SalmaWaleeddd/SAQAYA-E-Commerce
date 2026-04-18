<template>
  <div class="products-view">
    <div class="products-view__container">
      <div class="products-view__header">
        <h1 class="products-view__title">Explore Our Products</h1>
        <ProductsSorting
          :current-sort="currentSort"
          @sort-change="handleSortChange"
        />
      </div>

      <!-- Products Count -->
      <div v-if="totalProductsValue > 0" class="products-view__count">
        Showing {{ productsList.length }} of {{ totalProductsValue }} products
      </div>

      <!-- Products Grid -->
      <div
        v-if="!isLoading && productsList.length > 0"
        class="products-view__grid"
      >
        <ProductList :products="productsList" @add-to-cart="handleAddToCart" />
      </div>

      <!-- Loading State -->
      <div
        v-if="isLoading && productsList.length === 0"
        class="products-view__loading"
      >
        <div class="loading__spinner"></div>
        <p>Loading products...</p>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="!isLoading && productsList.length === 0"
        class="products-view__empty"
      >
        <p>No products found</p>
      </div>

      <!-- Load More Button -->
      <div
        v-if="hasMoreProducts && !isLoading && productsList.length > 0"
        class="products-view__load-more"
      >
        <BaseButton
          @click="loadMoreProducts"
          variant="primary"
          :disabled="loadMoreLoading"
        >
          {{ loadMoreLoading ? "Loading..." : "Load more..." }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState, mapGetters, mapActions } from "vuex";
import { Product, SortOption } from "@/types/product";
import { SORT_OPTIONS } from "@/constants/products";
import ProductList from "@/components/product/ProductList.vue";
import ProductsSorting from "@/components/product/ProductsSorting.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

interface ProductsViewData {
  currentSort: string;
  loadMoreLoading: boolean;
}

export default {
  name: "ProductsView",
  components: {
    ProductList,
    ProductsSorting,
    BaseButton,
  },
  data(): ProductsViewData {
    return {
      currentSort: "default",
      loadMoreLoading: false,
    };
  },
  computed: {
    ...mapState("products", ["loading"]),
    ...mapGetters("products", ["allProducts", "hasMore", "totalProducts"]),

    isLoading(): boolean {
      return (this as any).loading;
    },

    productsList(): Product[] {
      return (this as any).allProducts || [];
    },

    hasMoreProducts(): boolean {
      return (this as any).hasMore;
    },

    totalProductsValue(): number {
      return (this as any).totalProducts;
    },
  },
  methods: {
    ...mapActions("products", ["fetchProducts", "loadMore", "applyFilters"]),
    ...mapActions("cart", ["addToCart"]),

    async loadProducts(): Promise<void> {
      try {
        await (this as any).fetchProducts();
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    },

    async loadMoreProducts(): Promise<void> {
      if ((this as any).loadMoreLoading || !(this as any).hasMoreProducts)
        return;

      (this as any).loadMoreLoading = true;
      try {
        await (this as any).loadMore();
      } catch (error) {
        console.error("Failed to load more products:", error);
      } finally {
        (this as any).loadMoreLoading = false;
      }
    },

    async handleSortChange(sortValue: string): Promise<void> {
      (this as any).currentSort = sortValue;

      const selectedOption = SORT_OPTIONS.find(
        (option: SortOption) => option.value === sortValue,
      );

      if (selectedOption && selectedOption.value !== "default") {
        await (this as any).applyFilters({
          sortBy: selectedOption.sortBy,
          order: selectedOption.order,
        });
      } else {
        // Reset sorting (default)
        await (this as any).applyFilters({
          sortBy: null,
          order: null,
        });
      }
    },

    handleAddToCart(product: Product): void {
      (this as any).addToCart({
        product: product,
        quantity: 1,
      });

      // Open cart sidebar
      (this as any).$root.$emit("open-cart-sidebar");
    },
  },
  mounted() {
    (this as any).loadProducts();
  },
};
</script>

<style lang="scss" scoped>
.products-view {
  padding: 40px 0 80px;
  min-height: 100vh;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 24px;
  }

  &__title {
    font-size: 36px;
    font-weight: 600;
    margin: 0;
    color: #000;
  }

  &__count {
    font-size: 14px;
    color: #666;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid #eee;
  }

  &__grid {
    margin-bottom: 40px;
  }

  &__load-more {
    text-align: center;
    margin-top: 40px;
  }

  &__loading {
    text-align: center;
    padding: 60px 20px;

    .loading__spinner {
      width: 48px;
      height: 48px;
      border: 3px solid #f3f3f3;
      border-top: 3px solid $color-primary;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 16px;
    }

    p {
      color: #666;
      font-size: 16px;
    }
  }

  &__empty {
    text-align: center;
    padding: 60px 20px;

    p {
      font-size: 18px;
      color: #666;
    }
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .products-view {
    padding: 20px 0 60px;
  }

  .products-view__header {
    flex-direction: column;
    align-items: flex-start;
  }

  .products-view__title {
    font-size: 24px;
  }
}
</style>
