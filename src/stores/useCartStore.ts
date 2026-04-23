import { defineStore } from 'pinia';
import { CartItem, CartState, CartSummary } from '@/types/cart';
import { Product } from '@/types/product';
import cartService from '@/services/cart.service';
import { FREE_SHIPPING_THRESHOLD } from '@/types/cart';

// Helper functions outside store (truly private)
function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.totalPrice, 0);
}

function calculateTotalQuantity(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

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
    
    // Base calculations using helper functions
    subtotal: (state): number => calculateSubtotal(state.items),
    totalQuantity: (state): number => calculateTotalQuantity(state.items),
    
    // Derived getters using base calculations
    cartItemCount: (state): number => calculateTotalQuantity(state.items),
    
    cartSummary: (state): CartSummary => {
      return cartService.calculateSummary(state.items);
    },
    
    isLoading: (state): boolean => state.loading,
    error: (state): string | null => state.error,
    
    // Shipping-related getters using subtotal
    qualifiesForFreeShipping(): boolean {
      return cartService.calculateShipping(this.subtotal) === 0;
    },
    
    freeShippingRemaining(): number {
      if (this.subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
      return FREE_SHIPPING_THRESHOLD - this.subtotal;
    },
    
    freeShippingProgress(): number {
      if (this.subtotal >= FREE_SHIPPING_THRESHOLD) return 100;
      return (this.subtotal / FREE_SHIPPING_THRESHOLD) * 100;
    },
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