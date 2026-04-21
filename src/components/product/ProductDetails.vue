<template>
  <div class="product-details">
    <!-- Product Info Section -->
    <div class="product-details__info">
      <h1 class="info__title">{{ product.title }}</h1>

      <!-- Rating -->
      <div class="info__rating">
        <div class="rating__stars">
          <span
            v-for="n in 5"
            :key="n"
            class="rating__star"
            :class="{ 'rating__star--filled': n <= Math.floor(getRating()) }"
            >★</span
          >
        </div>
        <span class="rating__reviews">({{ getReviewCount() }} Reviews)</span>
        <span v-if="isInStock" class="rating__stock rating__stock--in">
          In Stock
        </span>
        <span v-else class="rating__stock rating__stock--out">
          Out of Stock
        </span>
      </div>

      <!-- Price -->
      <div class="info__price-wrapper">
        <span class="price__sale"> {{ formatPrice(getSalePrice()) }} </span>
        <span v-if="hasDiscount" class="price__original">
          {{ formatPrice(product.price) }}
        </span>
        <span v-if="hasDiscount" class="price__discount">
          -{{ product.discountPercentage }}%
        </span>
      </div>

      <!-- Description -->
      <p class="info__description">{{ product.description }}</p>

      <!-- Category -->
      <div class="info__category">
        <span class="category__label">Category:</span>
        <span class="category__value">{{
          formatCategoryName(product.category)
        }}</span>
      </div>
    </div>

    <!-- Product Actions Section -->
    <div class="product-details__actions">
      <div class="actions__quantity">
        <div class="quantity__selector">
          <button
            class="quantity__btn quantity__btn--decrement"
            @click="decrement"
            :disabled="quantity <= 1"
          >
            -
          </button>
          <span class="quantity__value">{{ quantity }}</span>
          <button
            class="quantity__btn quantity__btn--increment"
            @click="increment"
            :disabled="quantity >= maxQuantity"
          >
            +
          </button>
        </div>
      </div>

      <BaseButton
        class="actions__buy-now"
        @click="handleBuyNow"
        variant="primary"
        :disabled="!isInStock"
      >
        Buy Now
      </BaseButton>

      <button class="actions__add-to-favorites">
        <img src="@/assets/icons/fav-icon.svg" alt="Add to favorites" />
      </button>
    </div>

    <!-- Product Delivery Section -->
    <div class="product-details__delivery">
      <div class="delivery__item">
        <div class="delivery__icon">
          <img src="@/assets/icons/delivery-icon.svg" alt="Free Delivery" />
        </div>
        <div class="delivery__content">
          <h4 class="delivery__title">Free Delivery</h4>
          <p class="delivery__description">
            Enter your postal code for Delivery Availability
          </p>
        </div>
      </div>
      <div class="delivery__item">
        <div class="delivery__icon">
          <img src="@/assets/icons/return-icon.svg" alt="Return Delivery" />
        </div>
        <div class="delivery__content">
          <h4 class="delivery__title">Return Delivery</h4>
          <p class="delivery__description">Free 30 Days Delivery Returns</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Product } from "@/types/product";
import { formatCategoryName, formatPrice } from "@/utils/stringUtils";
import BaseButton from "@/components/ui/BaseButton.vue";

export default {
  name: "ProductDetails",
  components: {
    BaseButton,
  },
  props: {
    product: {
      type: Object as () => Product,
      required: true,
    },
  },
  data() {
    return {
      quantity: 1,
      postalCode: "",
    };
  },
  computed: {
    hasDiscount(): boolean {
      return !!(
        (this as any).product.discountPercentage &&
        (this as any).product.discountPercentage > 0
      );
    },

    isInStock(): boolean {
      return (this as any).product.stock > 0;
    },

    maxQuantity(): number {
      return (this as any).product.stock || 999;
    },
  },
  watch: {
    maxQuantity: {
      handler(newMax: number) {
        if ((this as any).quantity > newMax) {
          (this as any).quantity = newMax;
        }
      },
      immediate: true,
    },
  },
  methods: {
    formatPrice,
    formatCategoryName,

    getSalePrice(): number {
      if ((this as any).product.discountPercentage) {
        return (
          (this as any).product.price *
          (1 - (this as any).product.discountPercentage / 100)
        );
      }
      return (this as any).product.price;
    },

    getRating(): number {
      return (this as any).product.rating || 0;
    },

    getReviewCount(): number {
      const reviews = (this as any).product.reviews;
      if (typeof reviews === "number") {
        return reviews;
      }
      if (Array.isArray(reviews)) {
        return reviews.length;
      }
      return 0;
    },

    increment() {
      if ((this as any).quantity < (this as any).maxQuantity) {
        (this as any).quantity++;
      }
    },

    decrement() {
      if ((this as any).quantity > 1) {
        (this as any).quantity--;
      }
    },

    handleBuyNow() {
      (this as any).$emit("buy-now", {
        product: (this as any).product,
        quantity: (this as any).quantity,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.product-details {
  &__info {
    margin-bottom: 32px;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 32px;
    padding-bottom: 32px;
    flex-wrap: wrap;
  }

  &__delivery {
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 4px;
  }
}

// Info Section Styles
.info {
  &__title {
    font-size: 24px;
    font-weight: 600;
    margin: 0 0 16px 0;
    color: #000;
    line-height: 1.3;
  }

  &__rating {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }

  &__price-wrapper {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
  }

  &__description {
    font-size: 14px;
    line-height: 1.6;
    color: #000;
    margin-bottom: 24px;
  }

  &__category {
    display: flex;
    gap: 8px;
    font-size: 20px;
    padding-top: 16px;
    border-top: 1px solid rgba(0, 0, 0, 0.5);
  }
}

.rating {
  &__stars {
    display: flex;
    gap: 4px;
  }

  &__star {
    color: #e0e0e0; // Light gray for empty stars (not black)
    font-size: 20px;
    transition: color 0.2s ease;

    &--filled {
      color: #ffad33; // Gold/yellow for filled stars
    }
  }

  &__reviews {
    color: #666;
    font-size: 14px;
    margin-left: 4px;
  }

  &__stock {
    font-size: 14px;
    font-weight: 500;
    border-left: 1px solid rgba(0, 0, 0, 0.2);
    padding-left: 12px;
    margin-left: 4px;

    &--in {
      color: rgba(0, 255, 102, 0.4);
    }

    &--out {
      color: #c62828;
    }
  }
}

.price {
  &__sale {
    font-size: 24px;
    font-weight: 400;
    color: #000;
  }

  &__original {
    font-size: 20px;
    color: #666;
    text-decoration: line-through;
  }

  &__discount {
    background: $color-primary;
    color: #fafafa;
    padding: 4px 12px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
  }
}

.category {
  &__label {
    color: #000;
    font-weight: 400;
  }

  &__value {
    color: #000;
  }
}

// Actions Section Styles
.actions {
  &__quantity {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  &__add-to-favorites {
    width: 44px;
    height: 44px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: rgba($color-primary, 0.1);
      border-color: $color-primary;
    }

    img {
      width: 20px;
      height: 20px;
    }
  }

  &__buy-now {
    flex: 1;
    min-width: 150px;
    height: 44px;
  }
}

.quantity {
  &__selector {
    display: flex;
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    overflow: hidden;
  }

  &__btn {
    width: 40px;
    height: 44px;
    border: none;
    background: #f5f5f5;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover:not(:disabled) {
      background: #e0e0e0;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    &--decrement {
      background: transparent;
      border-right: 1px solid rgba(0, 0, 0, 0.5);
    }

    &--increment {
      background: $color-primary;
      color: #fff;
      border-left: 1px solid rgba(0, 0, 0, 0.5);
    }
  }

  &__value {
    width: 60px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 500;
    background: white;
  }
}

// Delivery Section Styles
.delivery {
  &__item {
    display: flex;
    gap: 16px;
    padding: 16px;

    &:first-child {
      border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 20px;
      height: 20px;
    }
  }

  &__content {
    flex: 1;
    color: #000;
  }

  &__title {
    font-size: 16px;
    font-weight: 500;
    margin: 0 0 4px 0;
  }

  &__description {
    font-size: 12px;
    margin: 0;
  }

  &__postal {
    display: flex;
    gap: 8px;
    margin-top: 12px;
  }

  &__input {
    flex: 1;
    padding: 10px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s ease;

    &:focus {
      border-color: $color-primary;
    }
  }
}

@media (max-width: 768px) {
  .info__title {
    font-size: 24px;
  }

  .price__sale {
    font-size: 24px;
  }

  .product-details__actions {
    flex-direction: column;
    align-items: stretch;
  }

  .actions__buy-now,
  .actions__add-to-favorites {
    width: 100%;
  }

  .actions__add-to-favorites {
    height: 44px;
  }
}
</style>
