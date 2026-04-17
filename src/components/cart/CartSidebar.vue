<template>
  <div>
    <!-- Overlay -->
    <div v-if="isOpen" class="cart-sidebar__overlay" @click="closeCart"></div>

    <!-- Sidebar -->
    <div class="cart-sidebar" :class="{ 'cart-sidebar--open': isOpen }">
      <div class="cart-sidebar__header">
        <h1 class="cart-sidebar__title">Shopping Cart</h1>
        <img
          src="@/assets/icons/cancel-icon.svg"
          alt="Close"
          class="cart-sidebar__close"
          @click="closeCart"
        />
      </div>

      <div v-if="typedCartItems.length === 0" class="cart-sidebar__empty">
        <p>Your cart is empty</p>
        <BaseButton
          class="cart-sidebar__continue-btn"
          @click="closeCart"
          variant="primary"
        >
          Continue Shopping
        </BaseButton>
      </div>

      <div v-else class="cart-sidebar__content">
        <!-- Cart Items -->
        <div class="cart-sidebar__items">
          <CartItem
            v-for="item in typedCartItems"
            :key="item.productId"
            :item="item"
            @update-quantity="handleUpdateQuantity"
            @remove="handleRemoveItem"
          />
        </div>

        <!-- Cart Summary -->
        <div class="cart-sidebar__summary">
          <div class="cart-sidebar__summary-row">
            <span>Subtotal:</span>
            <span>{{ formatPrice(typedCartSummary.subtotal) }}</span>
          </div>

          <div class="cart-sidebar__summary-row">
            <span>Shipping:</span>
            <span>
              <span v-if="typedCartSummary.shipping === 0" class="free-shipping"
                >Free</span
              >
              <span v-else>{{ formatPrice(typedCartSummary.shipping) }}</span>
            </span>
          </div>

          <!-- Free shipping progress bar -->
          <div
            v-if="!qualifiesForFreeShipping"
            class="cart-sidebar__free-shipping"
          >
            <p>
              Add {{ formatPrice(freeShippingRemaining) }} more to get free
              shipping!
            </p>
            <div class="progress-bar">
              <div
                class="progress-bar__fill"
                :style="{ width: freeShippingProgress + '%' }"
              ></div>
            </div>
          </div>

          <div
            class="cart-sidebar__summary-row cart-sidebar__summary-row--total"
          >
            <span>Total:</span>
            <span>{{ formatPrice(typedCartSummary.total) }}</span>
          </div>

          <div class="cart-sidebar__actions">
            <BaseButton
              class="cart-sidebar__checkout-btn"
              @click="handleCheckout"
              variant="primary"
            >
              Place Order
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from "vuex";
import CartItem from "@/components/cart/CartItem.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import { formatPrice } from "@/utils/stringUtils";
import { FREE_SHIPPING_THRESHOLD } from "@/types/cart";
import { CartItem as CartItemType, CartSummary } from "@/types/cart";

export default {
  name: "CartSidebar",
  components: {
    CartItem,
    BaseButton,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    ...mapGetters("cart", ["cartItems", "cartSummary"]),

    typedCartItems(): CartItemType[] {
      const items = (this as any).cartItems;
      return items || [];
    },

    typedCartSummary(): CartSummary {
      const summary = (this as any).cartSummary;
      return summary || { subtotal: 0, shipping: 0, total: 0, itemCount: 0 };
    },

    qualifiesForFreeShipping(): boolean {
      return this.typedCartSummary.subtotal >= FREE_SHIPPING_THRESHOLD;
    },

    freeShippingRemaining(): number {
      if (this.qualifiesForFreeShipping) return 0;
      return FREE_SHIPPING_THRESHOLD - this.typedCartSummary.subtotal;
    },

    freeShippingProgress(): number {
      if (this.qualifiesForFreeShipping) return 100;
      return (this.typedCartSummary.subtotal / FREE_SHIPPING_THRESHOLD) * 100;
    },
  },
  methods: {
    formatPrice,

    ...mapActions("cart", ["updateQuantity", "removeItem", "clearCart"]),

    handleUpdateQuantity(payload: {
      productId: number;
      quantity: number;
    }): void {
      (this as any).updateQuantity(payload);
    },

    handleRemoveItem(productId: number): void {
      (this as any).removeItem(productId);
    },

    openCart(): void {
      this.isOpen = true;
      document.body.style.overflow = "hidden";
    },

    closeCart(): void {
      this.isOpen = false;
      document.body.style.overflow = "";
    },

    async handleCheckout(): Promise<void> {
      try {
        console.log("Order placed:", this.typedCartItems);
        alert("Order placed successfully!");
        await (this as any).clearCart();
        this.closeCart();
        (this as any).$router.push("/");
      } catch (error) {
        console.error("Checkout failed:", error);
        alert("Failed to place order. Please try again.");
      }
    },
  },
  mounted() {
    (this as any).$root.$on("open-cart-sidebar", this.openCart);
  },
  beforeDestroy() {
    (this as any).$root.$off("open-cart-sidebar", this.openCart);
  },
};
</script>

<style lang="scss" scoped>
.cart-sidebar {
  position: fixed;
  top: 0;
  right: -100%;
  width: 100%;
  max-width: 500px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease;
  z-index: 1000;
  display: flex;
  flex-direction: column;

  &--open {
    right: 0;
  }

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    animation: fadeIn 0.3s ease;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    flex-shrink: 0;
  }

  &__title {
    font-size: 24px;
    font-weight: 500;
    margin: 0;
  }

  &__close {
    width: 24px;
    height: 24px;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }

  &__content {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
  }

  &__empty {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 40px;

    p {
      font-size: 18px;
      color: #666;
    }
  }

  &__items {
    margin-bottom: 24px;
  }

  &__summary {
    padding: 20px;

    &-row {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #e0e0e0;

      &:last-of-type {
        border-bottom: none;
      }

      &--total {
        margin-top: 8px;
        padding-top: 16px;
        border: none;
      }
    }
  }

  &__free-shipping {
    margin: 16px 0;
    padding: 12px;
    background: #e8f5e9;
    border-radius: 8px;

    p {
      margin: 0 0 8px 0;
      font-size: 14px;
      color: #2e7d32;
    }

    .progress-bar {
      height: 6px;
      background: #c8e6c9;
      border-radius: 3px;
      overflow: hidden;

      &__fill {
        height: 100%;
        background: #2e7d32;
        transition: width 0.3s ease;
      }
    }
  }

  &__actions {
    display: flex;
    justify-content: flex-start;
    margin-top: 20px;
  }
}

.free-shipping {
  color: #2e7d32;
  font-weight: 500;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .cart-sidebar {
    max-width: 100%;
  }
}
</style>
