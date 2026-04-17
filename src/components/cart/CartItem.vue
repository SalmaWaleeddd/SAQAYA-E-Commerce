<template>
  <div class="cart-item">
    <button class="cart-item__remove" @click="remove">
      <img src="@/assets/icons/cancel-icon.svg" alt="Remove" />
    </button>
    <div class="cart-item__image">
      <img :src="item.thumbnail" :alt="item.title" />
    </div>

    <div class="cart-item__details">
      <h3 class="cart-item__title">{{ item.title }}</h3>
      <p class="cart-item__price">{{ formatPrice(item.price) }}</p>
    </div>

    <div class="cart-item__quantity">
      <span class="cart-item__quantity-value">{{ item.quantity }}</span>
      <div class="cart-item__quantity-controls">
        <button class="cart-item__quantity-btn" @click="increment">
          <img src="@/assets/icons/arrow-up-icon.svg" alt="Increase" />
        </button>

        <button
          class="cart-item__quantity-btn"
          @click="decrement"
          :disabled="item.quantity <= 1"
        >
          <img src="@/assets/icons/arrow-down-icon.svg" alt="Decrease" />
        </button>
      </div>
    </div>

    <div class="cart-item__total">
      {{ formatPrice(item.totalPrice) }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { CartItem } from "@/types/cart";
import { formatPrice } from "@/utils/stringUtils";

export default defineComponent({
  name: "CartItem",
  props: {
    item: {
      type: Object as () => CartItem,
      required: true,
    },
  },
  methods: {
    formatPrice,

    increment() {
      this.$emit("update-quantity", {
        productId: this.item.productId,
        quantity: this.item.quantity + 1,
      });
    },

    decrement() {
      if (this.item.quantity > 1) {
        this.$emit("update-quantity", {
          productId: this.item.productId,
          quantity: this.item.quantity - 1,
        });
      }
    },

    remove() {
      this.$emit("remove", this.item.productId);
    },
  },
});
</script>

<style lang="scss" scoped>
.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border-bottom: 1px solid #eee;
  position: relative;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #A0BCE0;
  }

  &__remove {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease, background 0.2s ease;
    z-index: 1;

    img {
      width: 24px;
      height: 24px;
    }
  }

  &:hover {
    .cart-item__remove {
      opacity: 1;
    }
  }

  &__image {
    width: 80px;
    height: 80px;
    margin-left: 40px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__details {
    flex: 1;
  }

  &__title {
    font-size: 16px;
    font-weight: 500;
    margin: 0 0 8px 0;
  }

  &__price {
    color: #666;
    margin: 0;
  }

  &__quantity {
    display: flex;
    align-items: center;
    gap: 12px;
    border: 1.5px solid rgba(0, 0, 0, 0.4);
    border-radius: 4px;
    padding: 0.25rem 0.5rem;
    background-color: transparent;

   
    
    &-controls {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    
    &-btn {
      width: 16px;
      height: 16px;
      border: none;
      background: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover:not(:disabled) {
        opacity: 0.7;
      }

      &:disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }
      
      img {
        width: 100%;
        height: 100%;
      }
    }

    &-value {
      min-width: 30px;
      text-align: center;
      font-weight: 500;
    }
  }

  &__total {
    font-weight: 400;
    font-size: 16px;
    min-width: 80px;
    text-align: right;
  }
}

@media (max-width: 768px) {
  .cart-item {
    flex-wrap: wrap;
    padding-left: 60px;
    
    &__remove {
      left: 16px;
    }
    
    &__image {
      margin-left: 0;
      width: 60px;
      height: 60px;
    }
    
    &__details {
      flex: 2;
      min-width: 150px;
    }
    
    &__quantity {
      order: 3;
      margin-top: 10px;
    }
    
    &__total {
      order: 4;
      text-align: left;
      margin-top: 10px;
    }
  }
}
</style>