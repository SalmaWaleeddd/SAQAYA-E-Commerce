import {
  CartState,
  CartItem,
  CartSummary,
} from "@/types/cart";
import { Product } from "@/types/product";
import cartService from "@/services/cart.service";

const state: CartState = {
  items: cartService.loadCart() || [],
  loading: false,
  error: null,
};

const getters = {
  cartItems: (state: CartState): CartItem[] => state.items,
  cartItemCount: (state: CartState): number => {
    return state.items.reduce((sum, item) => sum + item.quantity, 0);
  },
  cartSummary: (state: CartState): CartSummary => {
    return cartService.calculateSummary(state.items);
  },
  isLoading: (state: CartState): boolean => state.loading,
  error: (state: CartState): string | null => state.error,
};

const mutations = {
  SET_ITEMS(state: CartState, items: CartItem[]) {
    state.items = items;
    cartService.saveCart(items);
  },

  ADD_ITEM(state: CartState, item: CartItem) {
    const existing = state.items.find((i) => i.productId === item.productId);
    if (existing) {
      existing.quantity += item.quantity;
      existing.totalPrice = existing.price * existing.quantity;
    } else {
      state.items.push(item);
    }
    cartService.saveCart(state.items);
  },

  UPDATE_QUANTITY(
    state: CartState,
    { productId, quantity }: { productId: number; quantity: number },
  ) {
    const item = state.items.find((i) => i.productId === productId);
    if (item) {
      if (quantity <= 0) {
        // Remove item if quantity becomes 0
        state.items = state.items.filter((i) => i.productId !== productId);
      } else {
        item.quantity = quantity;
        item.totalPrice = item.price * quantity;
      }
      cartService.saveCart(state.items);
    }
  },

  REMOVE_ITEM(state: CartState, productId: number) {
    state.items = state.items.filter((i) => i.productId !== productId);
    cartService.saveCart(state.items);
  },

  CLEAR_CART(state: CartState) {
    state.items = [];
    cartService.clearCart();
  },

  SET_LOADING(state: CartState, loading: boolean) {
    state.loading = loading;
  },

  SET_ERROR(state: CartState, error: string | null) {
    state.error = error;
  },
};

const actions = {
  addToCart(
    { commit }: { commit: any },
    { product, quantity = 1 }: { product: Product; quantity?: number },
  ) {
    const cartItem = cartService.createCartItem(product, quantity);
    commit("ADD_ITEM", cartItem);
  },

  updateQuantity(
    { commit }: { commit: any },
    { productId, quantity }: { productId: number; quantity: number },
  ) {
    commit("UPDATE_QUANTITY", { productId, quantity });
  },

  removeItem({ commit }: { commit: any }, productId: number) {
    commit("REMOVE_ITEM", productId);
  },

  clearCart({ commit }: { commit: any }) {
    commit("CLEAR_CART");
  },
};

export default{
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
