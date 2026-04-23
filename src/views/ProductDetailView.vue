<template>
  <div class="product-detail-view">
    <div class="product-detail-view__container">
      <!-- Loading State -->
      <div v-if="isLoading" class="product-detail-view__loading">
        <div class="loading__spinner"></div>
        <p>Loading product details...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="hasError" class="product-detail-view__error">
        <p>{{ errorMessage }}</p>
        <BaseButton @click="retryLoad" variant="primary">Try Again</BaseButton>
      </div>

      <!-- Product Content -->
      <div v-else-if="product" class="product-detail-view__content">
        <div class="product-detail-view__main">
          <!-- Product Gallery -->
          <ProductGallery :images="product.images" :title="product.title" />

          <!-- Product Details: Info + Actions + Delivery -->
          <ProductDetails :product="product" @buy-now="handleBuyNow" />
        </div>

        <!-- Related Products Section -->
        <div class="product-detail-view__related">
          <SectionHeader subtitle="More of this category" title="" />
          <ProductList
            v-if="relatedProducts.length > 0"
            :products="relatedProducts"
          />
          <div v-else class="related__empty">No related products found.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useProductsStore } from "@/stores/useProductStore";
import { useCartStore } from "@/stores/useCartStore";
import type { Product } from "@/types/product";
import productService from "@/services/product.service";
import BaseButton from "@/components/ui/BaseButton.vue";
import ProductGallery from "@/components/product/ProductGallery.vue";
import ProductDetails from "@/components/product/ProductDetails.vue";
import ProductList from "@/components/product/ProductList.vue";
import SectionHeader from "@/components/common/SectionHeader.vue";

// Props
interface Props {
  id: string;
}

const props = defineProps<Props>();

// Router
const router = useRouter();

// Stores
const productsStore = useProductsStore();
const cartStore = useCartStore();

// Reactive state from products store
const { isLoading, error, currentProduct } = storeToRefs(productsStore);

// Local state
const relatedProducts = ref<Product[]>([]);

// Computed
const hasError = computed(() => !!error.value);
const errorMessage = computed(() => error.value || "Failed to load product details");
const product = computed(() => currentProduct.value);

// Methods
async function loadRelatedProducts(category: string, currentProductId: number) {
  try {
    const response = await productService.getProductsByCategory(category, 5);
    
    relatedProducts.value = response.products
      .filter((p: Product) => p.id !== currentProductId)
      .slice(0, 4);
  } catch (err) {
    console.error("Failed to load related products:", err);
  }
}

async function loadProduct() {
  const productId = parseInt(props.id, 10);
  
  if (isNaN(productId)) {
    router.push("/");
    return;
  }

  try {
    const product = await productsStore.fetchProductById(productId);
    if (product && product.category) {
      await loadRelatedProducts(product.category, product.id);
    }
  } catch (err) {
    console.error("Failed to load product:", err);
  }
}

function handleBuyNow(payload: { product: Product; quantity: number }) {
  cartStore.addToCart(payload.product, payload.quantity);
  cartStore.openCart();
}

function retryLoad() {
  loadProduct();
}

// Lifecycle
onMounted(() => {
  loadProduct();
});

onBeforeUnmount(() => {
  productsStore.clearCurrentProduct();
});
</script>

<style lang="scss" scoped>
.product-detail-view {
  padding: 40px 0 80px;
  background: #fff;
  min-height: 100vh;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  &__loading {
    text-align: center;
    padding: 80px 20px;

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

  &__error {
    text-align: center;
    padding: 80px 20px;

    p {
      color: #c62828;
      font-size: 16px;
      margin-bottom: 20px;
    }
  }

  &__main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    margin-bottom: 60px;
  }

  &__related {
    margin-top: 60px;
    padding-top: 40px;
    border-top: 1px solid #eee;

    .related__title {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 24px;
      color: #000;
    }

    .related__empty {
      text-align: center;
      padding: 40px;
      color: #666;
      font-size: 14px;
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
  .product-detail-view {
    padding: 20px 0 60px;
  }

  .product-detail-view__main {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .product-detail-view__related {
    .related__title {
      font-size: 20px;
    }
  }
}
</style>