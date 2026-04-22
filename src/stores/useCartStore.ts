import { defineStore } from 'pinia';
import { CartItem, CartState, CartSummary } from '@/types/cart';
import { Product } from '@/types/product';
import cartService from '@/services/cart.service';


export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    isOpen: false,
    items: cartService.loadCart() || [],
    loading: false,
    error: null,
  }),

  getters: {
    cartOpen: (state): boolean => state.isOpen,
    cartItems: (state): CartItem[] => state.items,
    cartItemCount: (state): number => {
      return state.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    cartSummary: (state): CartSummary => {
      return cartService.calculateSummary(state.items);
    },
    isLoading: (state): boolean => state.loading,
    error: (state): string | null => state.error,
  },

  actions: {
    openCart() {
      this.isOpen = true;
    },
    
    closeCart() {
      this.isOpen = false;
    },
    
    toggleCart() {
      this.isOpen = !this.isOpen;
    },

    addToCart(product: Product, quantity = 1) {
      const cartItem = cartService.createCartItem(product, quantity);
      const existing = this.items.find((i) => i.productId === cartItem.productId);

      if (existing) {
        existing.quantity += cartItem.quantity;
        existing.totalPrice = existing.price * existing.quantity;
        this.items = [...this.items];
      } else {
        this.items = [...this.items, cartItem];
      }

      cartService.saveCart(this.items);
    },

    updateQuantity(productId: number, quantity: number) {
      const itemIndex = this.items.findIndex((i) => i.productId === productId);

      if (itemIndex === -1) return;

      if (quantity <= 0) {
        this.items = this.items.filter((i) => i.productId !== productId);
      } else {
        const item = this.items[itemIndex];
        item.quantity = quantity;
        item.totalPrice = item.price * quantity;
        this.items = [...this.items];
      }

      cartService.saveCart(this.items);
    },

    removeItem(productId: number) {
      this.items = this.items.filter((i) => i.productId !== productId);
      cartService.saveCart(this.items);
    },

    clearCart() {
      this.items = [];
      cartService.clearCart();
    },

    setLoading(loading: boolean) {
      this.loading = loading;
    },

    setError(error: string | null) {
      this.error = error;
    },
  },
});