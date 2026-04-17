import {
  CartItem,
  CartSummary,
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_COST,
} from "@/types/cart";
import { Product } from "@/types/product";

class CartService {
  private readonly STORAGE_KEY = "shopping_cart";

  saveCart(items: CartItem[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
  }

  loadCart(): CartItem[] {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  }

  clearCart(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  calculateShipping(subtotal: number): number {
    // Free shipping for orders above $140 from home page trust badge
    if (subtotal >= FREE_SHIPPING_THRESHOLD) {
      return 0;
    }
    return SHIPPING_COST;
  }

  calculateSummary(items: CartItem[]): CartSummary {
    const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
    const shipping = this.calculateShipping(subtotal);
    const total = subtotal + shipping;
    const itemCount = items.reduce((count, item) => count + item.quantity, 0);

    return {
      subtotal,
      shipping,
      total,
      itemCount,
    };
  }

  createCartItem(product: Product, quantity = 1): CartItem {
    const hasDiscount = product.discountPercentage > 0;
    const finalPrice = hasDiscount
      ? product.price * (1 - product.discountPercentage / 100)
      : product.price;

    return {
      id: Date.now() + Math.random(), // temporary unique ID
      productId: product.id,
      title: product.title,
      thumbnail: product.thumbnail,
      price: finalPrice,
      quantity: quantity,
      totalPrice: finalPrice * quantity,
    };
  }
}

export const cartService = new CartService();
export default cartService;
