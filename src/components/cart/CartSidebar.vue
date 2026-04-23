<template>
  <div>
    <!-- Overlay -->
    <div v-if="cartOpen" class="cart-sidebar__overlay" @click="closeCart"></div>

    <!-- Sidebar -->
    <div class="cart-sidebar" :class="{ 'cart-sidebar--open': cartOpen }">
      <div class="cart-sidebar__header">
        <h1 class="cart-sidebar__title">Shopping Cart</h1>
        <img
          src="@/assets/icons/cancel-icon.svg"
          alt="Close"
          class="cart-sidebar__close"
          @click="closeCart"
        />
      </div>

      <div v-if="cartItems.length === 0" class="cart-sidebar__empty">
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
            v-for="item in cartItems"
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
            <span>{{ formatPrice(cartSummary.subtotal) }}</span>
          </div>

          <div class="cart-sidebar__summary-row">
            <span>Shipping:</span>
            <span>
              <span v-if="cartSummary.shipping === 0" class="free-shipping"
                >Free</span
              >
              <span v-else>{{ formatPrice(cartSummary.shipping) }}</span>
            </span>
          </div>

          <!-- Free shipping progress bar  -->
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
            <span>{{ formatPrice(cartSummary.total) }}</span>
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

<script setup lang="ts">
import { watch } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useCartStore } from "@/stores/useCartStore";
import CartItem from "@/components/cart/CartItem.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import { formatPrice } from "@/utils/stringUtils";

const router = useRouter();
const cartStore = useCartStore();

const {
  cartItems,
  cartSummary,
  cartOpen,
  qualifiesForFreeShipping,
  freeShippingRemaining,
  freeShippingProgress,
} = storeToRefs(cartStore);

// Actions
const { updateQuantity, removeItem, clearCart, closeCart } = cartStore;

// Methods
function handleUpdateQuantity(payload: {
  productId: number;
  quantity: number;
}): void {
  updateQuantity(payload.productId, payload.quantity);
}

function handleRemoveItem(productId: number): void {
  removeItem(productId);
}

async function handleCheckout(): Promise<void> {
  try {
    console.log("Order placed:", cartItems.value);
    alert("Order placed successfully!");
    await clearCart();
    closeCart();
    router.push("/");
  } catch (error) {
    console.error("Checkout failed:", error);
    alert("Failed to place order. Please try again.");
  }
}

// Watch cartOpen to control body scroll
watch(cartOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});
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
