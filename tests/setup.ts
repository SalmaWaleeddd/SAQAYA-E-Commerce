import { config } from "@vue/test-utils";
import { createPinia } from "pinia";
import { createApp } from "vue";

// Mock Pinia stores
jest.mock('@/stores/useCartStore', () => ({
  useCartStore: jest.fn(() => ({
    cartItems: [],
    cartSummary: { subtotal: 0, shipping: 0, total: 0, itemCount: 0 },
    cartOpen: false,
    cartItemCount: 0,
    qualifiesForFreeShipping: false,
    freeShippingRemaining: 140,
    freeShippingProgress: 0,
    openCart: jest.fn(),
    closeCart: jest.fn(),
    toggleCart: jest.fn(),
    addToCart: jest.fn(),
    updateQuantity: jest.fn(),
    removeItem: jest.fn(),
    clearCart: jest.fn(),
  })),
}));

jest.mock('@/stores/useProductsStore', () => ({
  useProductsStore: jest.fn(() => ({
    allProducts: [],
    currentProduct: null,
    isLoading: false,
    hasMore: true,
    totalProducts: 0,
    categories: [],
    error: null,
    activeFilters: {},
    hasActiveFilters: false,
    activeFiltersCount: 0,
    fetchProducts: jest.fn(),
    fetchProductById: jest.fn(),
    fetchCategories: jest.fn(),
    loadMore: jest.fn(),
    applyFilter: jest.fn(),
    applyFilters: jest.fn(),
    resetFilters: jest.fn(),
    clearCurrentProduct: jest.fn(),
  })),
}));

// Mock Vue Router
jest.mock('vue-router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    go: jest.fn(),
    back: jest.fn(),
  })),
  useRoute: jest.fn(() => ({
    path: '/',
    params: {},
    query: {},
  })),
  createRouter: jest.fn(),
  createWebHistory: jest.fn(),
}));

// Mock product service
jest.mock('@/services/product.service', () => ({
  default: {
    getProductById: jest.fn(),
    getProducts: jest.fn(),
    getProductsByCategory: jest.fn(),
    getCategoryList: jest.fn(),
    getDiscountedPrice: jest.fn((product) => product.price),
    searchProducts: jest.fn(),
  },
}));

// Mock window and document
Object.defineProperty(globalThis, 'window', {
  value: {
    scrollTo: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    location: { href: '' },
  },
});

globalThis.document = {
  body: { style: { overflow: '' } },
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
} as any;

// Configure Vue Test Utils for Vue 3
config.global.stubs = {
  'router-link': { template: '<a><slot /></a>' },
  'router-view': { template: '<div><slot /></div>' },
  'DefaultLayout': { template: '<div><slot /></div>' },
  'CartSidebar': { template: '<div></div>' },
  'ProductList': { template: '<div></div>' },
};

// Helper to create a Pinia store for testing
export function createTestStore() {
  const pinia = createPinia();
  const app = createApp({});
  app.use(pinia);
  return pinia;
}