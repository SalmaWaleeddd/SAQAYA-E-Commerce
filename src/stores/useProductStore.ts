import { defineStore } from "pinia";
import productService from "@/services/product.service";
import {
  Product,
  ProductsResponse,
  ProductFilters,
  ProductsState,
} from "@/types/product";

function hasActiveFilters(filters: ProductFilters): boolean {
  const values = [filters.q, filters.category, filters.sortBy, filters.order];
  return values.some((value) => value !== null && value !== "");
}

function getActiveFiltersCount(filters: ProductFilters): number {
  const values = [filters.q, filters.category, filters.sortBy, filters.order];
  return values.filter((value) => value !== null && value !== "").length;
}

function getActiveFilters(filters: ProductFilters): Partial<ProductFilters> {
  const active: Partial<ProductFilters> = {};

  if (filters.q !== null && filters.q !== "") active.q = filters.q;
  if (filters.category !== null && filters.category !== "")
    active.category = filters.category;
  if (filters.sortBy !== null && filters.sortBy !== "")
    active.sortBy = filters.sortBy;
  if (filters.order !== null) active.order = filters.order;

  return active;
}

export const useProductsStore = defineStore("products", {
  state: (): ProductsState => ({
    items: [],
    currentProduct: null,
    pagination: {
      skip: 0,
      limit: 20,
      total: 0,
      hasMore: true,
    },
    filters: {
      q: null,
      category: null,
      sortBy: null,
      order: null,
    },
    categories: [],
    error: null,
    loading: false,
  }),

  getters: {
    allProducts: (state): Product[] => state.items,
    currentProduct: (state): Product | null => state.currentProduct,
    error: (state): string | null => state.error,
    isLoading: (state): boolean => state.loading,
    hasMore: (state): boolean => state.pagination.hasMore,
    totalProducts: (state): number => state.pagination.total,
    loadedCount: (state): number => state.items.length,

    currentProductDiscountedPrice: (state): number | null => {
      if (!state.currentProduct) return null;
      return productService.getDiscountedPrice(state.currentProduct);
    },

    activeFilters: (state): Partial<ProductFilters> =>
      getActiveFilters(state.filters),
    hasActiveFilters: (state): boolean => hasActiveFilters(state.filters),
    activeFiltersCount: (state): number => getActiveFiltersCount(state.filters),
    categories: (state): string[] => state.categories,
  },

  actions: {
    async loadMore() {
      if (!this.pagination.hasMore) return;
      if (this.loading) return;

      this.loading = true;
      this.error = null;

      try {
        // Build filters object for the service
        const filters: ProductFilters = {
          limit: this.pagination.limit,
          skip: this.pagination.skip,
        };

        // Add active filters only if they have values
        if (this.filters.q) filters.q = this.filters.q;
        if (this.filters.category) filters.category = this.filters.category;
        if (this.filters.sortBy) filters.sortBy = this.filters.sortBy;
        if (this.filters.order) filters.order = this.filters.order;

        const response = await productService.getProducts(filters);

        this.items = [...this.items, ...response.products];
        this.pagination.total = response.total;
        this.pagination.skip = this.pagination.skip + response.products.length;
        this.pagination.hasMore = this.items.length < response.total;

        return response.products;
      } catch (error: any) {
        this.error = error.message || "Failed to load products";
        console.error("Error loading products:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchProducts() {
      this.resetProducts();
      await this.loadMore();
    },

    async fetchProductById(productId: number) {
      this.clearError();
      this.loading = true;

      try {
        const product = await productService.getProductById(productId);
        this.currentProduct = product;
        return product;
      } catch (error: any) {
        this.error = error.message || "Failed to fetch product";
        console.error(`Error fetching product ${productId}:`, error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchCategories() {
      if (this.categories.length > 0) return this.categories;

      this.loading = true;
      this.error = null;

      try {
        const categories = await productService.getCategoryList();
        this.categories = categories;
        return categories;
      } catch (error: any) {
        this.error = error.message || "Failed to fetch categories";
        console.error("Error fetching categories:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async applyFilter(key: keyof ProductFilters, value: string | null) {
      this.setFilter(key, value);
      await this.fetchProducts();
    },

    async applyFilters(filters: Partial<ProductFilters>) {
      // Apply all filters at once
      (Object.keys(filters) as Array<keyof ProductFilters>).forEach((key) => {
        const value = filters[key];
        if (value !== undefined) {
          (this.filters[key] as string | null) = value as string | null;
        }
      });

      // Reset pagination when filters change
      this.pagination.skip = 0;
      this.items = [];
      this.pagination.hasMore = true;

      await this.fetchProducts();
    },

    async resetFilters() {
      this.resetAllFilters();
      await this.fetchProducts();
    },

    appendProducts(payload: {
      products: Product[];
      total: number;
      limit: number;
      skip: number;
    }) {
      this.items = [...this.items, ...payload.products];
      this.pagination.total = payload.total;
      this.pagination.limit = payload.limit;
      this.pagination.skip = payload.skip + payload.products.length;
      this.pagination.hasMore = this.items.length < payload.total;
    },

    setProducts(payload: {
      products: Product[];
      total: number;
      limit: number;
      skip: number;
    }) {
      this.items = payload.products;
      this.pagination.total = payload.total;
      this.pagination.limit = payload.limit;
      this.pagination.skip = payload.skip + payload.products.length;
      this.pagination.hasMore = payload.products.length < payload.total;
    },

    setCurrentProduct(product: Product | null) {
      this.currentProduct = product;
    },

    updateItemStock(productId: number, newStock: number) {
      const item = this.items.find((p) => p.id === productId);
      if (item) {
        item.stock = newStock;
      }
    },

    setError(error: string | null) {
      this.error = error;
    },

    clearError() {
      this.error = null;
    },

    setFilter(key: keyof ProductFilters, value: string | null) {
      (this.filters[key] as string | null) = value;
      this.pagination.skip = 0;
      this.items = [];
      this.pagination.hasMore = true;
    },

    resetAllFilters() {
      this.filters = {
        q: null,
        category: null,
        sortBy: null,
        order: null,
      };
      this.pagination.skip = 0;
      this.items = [];
      this.pagination.hasMore = true;
    },

    setCategories(categories: string[]) {
      this.categories = categories;
    },

    resetProducts() {
      this.items = [];
      this.pagination.skip = 0;
      this.pagination.hasMore = true;
      this.pagination.total = 0;
      this.error = null;
      this.loading = false;
    },

    clearCurrentProduct() {
      this.currentProduct = null;
    },

    updateProductStock(productId: number, quantity: number) {
      const product = this.items.find((p) => p.id === productId);
      if (product) {
        const newStock = product.stock - quantity;
        this.updateItemStock(productId, newStock);

        if (this.currentProduct?.id === productId) {
          this.currentProduct = {
            ...this.currentProduct,
            stock: this.currentProduct.stock - quantity,
          };
        }
      }
    },

    async refreshCurrentProduct() {
      if (this.currentProduct?.id) {
        await this.fetchProductById(this.currentProduct.id);
      }
    },

    async loadAllProducts(maxPages = 5) {
      const products: Product[] = [];
      let pagesLoaded = 0;

      while (this.pagination.hasMore && pagesLoaded < maxPages) {
        const newProducts = await this.loadMore();
        if (newProducts) {
          products.push(...newProducts);
        }
        pagesLoaded++;
      }

      return products;
    },
  },
});
