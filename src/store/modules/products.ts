// store/modules/products.ts
import productService from "@/services/product.service";
import { ProductsState, Product, ProductsResponse, ProductFilters } from "@/types/product";

const state: ProductsState = {
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
};

// Getters
const getters = {
  allProducts: (state: ProductsState): Product[] => state.items,
  currentProduct: (state: ProductsState): Product | null =>
    state.currentProduct,
  error: (state: ProductsState): string | null => state.error,

  hasMore: (state: ProductsState): boolean => state.pagination.hasMore,
  totalProducts: (state: ProductsState): number => state.pagination.total,
  loadedCount: (state: ProductsState): number => state.items.length,

  currentProductDiscountedPrice: (state: ProductsState): number | null => {
    if (!state.currentProduct) return null;
    return productService.getDiscountedPrice(state.currentProduct);
  },

  activeFilters: (state: ProductsState): Partial<ProductFilters> => {
    const active: Partial<ProductFilters> = {};
    Object.keys(state.filters).forEach((key) => {
      const filterKey = key as keyof ProductFilters;
      if (
        state.filters[filterKey] !== null &&
        state.filters[filterKey] !== ""
      ) {
        active[filterKey] = state.filters[filterKey] as any;
      }
    });
    return active;
  },

  hasActiveFilters: (state: ProductsState, getters: any): boolean => {
    return Object.keys(getters.activeFilters).length > 0;
  },

  activeFiltersCount: (state: ProductsState, getters: any): number => {
    return Object.keys(getters.activeFilters).length;
  },

  categories: (state: ProductsState): string[] => state.categories,
};

// Mutations
const mutations = {
  APPEND_PRODUCTS(
    state: ProductsState,
    payload: {
      products: Product[];
      total: number;
      limit: number;
      skip: number;
    },
  ) {
    state.items = [...state.items, ...payload.products];
    state.pagination.total = payload.total;
    state.pagination.limit = payload.limit;
    state.pagination.skip = payload.skip + payload.products.length;
    state.pagination.hasMore = state.items.length < payload.total;
  },

  SET_PRODUCTS(
    state: ProductsState,
    payload: {
      products: Product[];
      total: number;
      limit: number;
      skip: number;
    },
  ) {
    state.items = payload.products;
    state.pagination.total = payload.total;
    state.pagination.limit = payload.limit;
    state.pagination.skip = payload.skip + payload.products.length;
    state.pagination.hasMore = payload.products.length < payload.total;
  },

  SET_CURRENT_PRODUCT(state: ProductsState, product: Product | null) {
    state.currentProduct = product;
  },

  SET_ERROR(state: ProductsState, error: string | null) {
    state.error = error;
  },

  CLEAR_ERROR(state: ProductsState) {
    state.error = null;
  },

  SET_FILTER(
    state: ProductsState,
    payload: { key: keyof ProductFilters; value: any },
  ) {
    state.filters[payload.key] = payload.value;
    state.pagination.skip = 0;
    state.items = [];
    state.pagination.hasMore = true;
  },

  RESET_FILTERS(state: ProductsState) {
    state.filters = {
      q: null,
      category: null,
      sortBy: null,
      order: null,
    };
    state.pagination.skip = 0;
    state.items = [];
    state.pagination.hasMore = true;
  },

  SET_CATEGORIES(state: ProductsState, categories: string[]) {
    state.categories = categories;
  },

  RESET_PRODUCTS(state: ProductsState) {
    state.items = [];
    state.pagination.skip = 0;
    state.pagination.hasMore = true;
    state.pagination.total = 0;
    state.error = null;
  },
};

// Actions
const actions = {
  async loadMore({ commit, state }: { commit: any; state: ProductsState }) {
    if (!state.pagination.hasMore) return;

    try {
      const filters: any = {
        limit: state.pagination.limit,
        skip: state.pagination.skip,
        ...state.filters,
      };

      // Remove null/empty values
      Object.keys(filters).forEach((key) => {
        if (filters[key] === null || filters[key] === "") {
          delete filters[key];
        }
      });

      let response: ProductsResponse;

      if (filters.q) {
        response = await productService.searchProducts(
          filters.q,
          filters.limit,
          filters.skip,
        );
      } else if (filters.category) {
        const { category, ...rest } = filters;
        response = await productService.getProductsByCategory(
          category,
          rest.limit,
          rest.skip,
        );
      } else {
        response = await productService.getProducts(filters);
      }

      commit("APPEND_PRODUCTS", {
        products: response.products,
        total: response.total,
        limit: response.limit,
        skip: state.pagination.skip,
      });

      return response.products;
    } catch (error: any) {
      commit("SET_ERROR", error.message || "Failed to load products");
      throw error;
    }
  },

  async fetchProducts({ commit, dispatch }: { commit: any; dispatch: any }) {
    commit("RESET_PRODUCTS");
    await dispatch("loadMore");
  },

  async fetchProductById({ commit }: { commit: any }, productId: number) {
    commit("CLEAR_ERROR");

    try {
      const product = await productService.getProductById(productId);
      commit("SET_CURRENT_PRODUCT", product);
      return product;
    } catch (error: any) {
      commit("SET_ERROR", error.message || "Failed to fetch product");
      throw error;
    }
  },

  async fetchCategories({ commit }: { commit: any }) {
    try {
      const categories = await productService.getCategoryList();
      commit("SET_CATEGORIES", categories);
      return categories;
    } catch (error: any) {
      commit("SET_ERROR", error.message || "Failed to fetch categories");
      throw error;
    }
  },

  async applyFilter(
    { commit, dispatch }: { commit: any; dispatch: any },
    { key, value }: { key: keyof ProductFilters; value: any },
  ) {
    commit("SET_FILTER", { key, value });
    await dispatch("fetchProducts");
  },

  async applyFilters(
    { commit, dispatch }: { commit: any; dispatch: any },
    filters: Partial<ProductFilters>,
  ) {
    Object.keys(filters).forEach((key) => {
      commit("SET_FILTER", {
        key,
        value: filters[key as keyof ProductFilters],
      });
    });
    await dispatch("fetchProducts");
  },

  async resetFilters({ commit, dispatch }: { commit: any; dispatch: any }) {
    commit("RESET_FILTERS");
    await dispatch("fetchProducts");
  },

  clearCurrentProduct({ commit }: { commit: any }) {
    commit("SET_CURRENT_PRODUCT", null);
  },

  updateProductStock(
    { state, commit }: { state: ProductsState; commit: any },
    { productId, quantity }: { productId: number; quantity: number },
  ) {
    const updatedItems = state.items.map((product) => {
      if (product.id === productId) {
        return { ...product, stock: (product as any).stock - quantity };
      }
      return product;
    });

    commit("SET_PRODUCTS", {
      products: updatedItems,
      total: state.pagination.total,
      limit: state.pagination.limit,
      skip: state.pagination.skip - state.pagination.limit,
    });

    if (state.currentProduct?.id === productId) {
      const updatedCurrent = {
        ...state.currentProduct,
        stock: (state.currentProduct as any).stock - quantity,
      };
      commit("SET_CURRENT_PRODUCT", updatedCurrent);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
