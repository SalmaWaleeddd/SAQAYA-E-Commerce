<template>
  <div class="product-card">
    <div class="product-card__img-container">
      <div
        v-if="product.discountPercentage"
        class="product-card__img-container__discount"
      >
        -{{ product.discountPercentage }}%
      </div>
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="product-card__img-container__img"
      />
      <div class="product-card__img-container__actions">
        <button class="product-card__img-container__actions__btn">
          <img src="@/assets/icons/fav-icon.svg" alt="Add to favorites" />
        </button>
        <button class="product-card__img-container__actions__btn">
          <img src="@/assets/icons/eye-icon.svg" alt="Quick view" />
        </button>
      </div>
    </div>

    <h3 class="product-card__title">{{ product.title }}</h3>

    <!-- Price Section -->
    <div class="product-card__price-wrapper">
      <!-- Sale price -->
      <p class="product-card__price-wrapper__price-sale">
        ${{ formatPrice(getSalePrice()) }}
      </p>
      <!-- Original price -->
      <p v-if="hasDiscount" class="product-card__price-wrapper__price-original">
        ${{ formatPrice(product.price) }}
      </p>
    </div>

    <div class="product-card__rating">
      <span
        v-for="n in 5"
        :key="n"
        class="product-card__rating__star"
        :class="{ 'product-card__rating__star--filled': n <= getRating() }"
        >★</span
      >
      <span class="product-card__rating__reviews"
        >({{ getReviewCount() }})</span
      >
    </div>
  </div>
</template>

<script>
import { formatPrice } from "@/utils/stringUtils";
export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      required: true,
      validator: (value) => {
        return value && value.title && value.price !== undefined;
      },
    },
  },
  computed: {
    hasDiscount() {
      return !!(this.product.discountPercentage || this.product.salePrice);
    },
  },
  methods: {
    formatPrice,
    getSalePrice() {
      if (this.product.discountPercentage) {
        return this.product.price * (1 - this.product.discountPercentage / 100);
      }
      return this.product.price;
    },

    getRating() {
      const rating = this.product.rating || 0;
      return Math.floor(rating);
    },

    getReviewCount() {
      if (typeof this.product.reviews === "number") {
        return this.product.reviews;
      }
      if (Array.isArray(this.product.reviews)) {
        return this.product.reviews.length;
      }
      return 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.product-card {
  background: white;
  border-radius: 4px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    .product-card__img-container__actions {
      opacity: 1;
    }
  }

  &__img-container {
    position: relative;
    margin-bottom: 16px;
    overflow: hidden;
    border-radius: 4px;
    background: $color-app-white;
    display: flex;
    justify-content: center;

    &__discount {
      position: absolute;
      top: 12px;
      left: 12px;
      background: $color-primary;
      color: white;
      padding: 4px 12px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 400;
      z-index: 2;
    }

    &__img {
      width: 70%;
      background: transparent;
      height: auto;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    &__actions {
      position: absolute;
      top: 12px;
      right: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      transition: opacity 0.3s ease;
      z-index: 2;

      &__btn {
        background: white;
        border: none;
        border-radius: 50%;
        width: 34px;
        height: 34px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background 0.3s ease;

        &:hover {
          background: $color-primary;

          img {
            filter: brightness(0) invert(1);
          }
        }

        img {
          width: 16px;
          height: 16px;
        }
      }
    }
  }

  &__title {
    font-size: 16px;
    font-weight: 500;
    margin: 0 0 8px 0;
    color: #000;
    line-height: 1.4;
  }

  &__price-wrapper {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
    font-weight: 500;
    font-size: 16px;

    &__price-sale {
      color: $color-primary;
      margin: 0;
    }

    &__price-original {
      color: #000;
      opacity: 0.5;
      text-decoration: line-through;
      margin: 0;
    }
  }

  &__rating {
    display: flex;
    align-items: center;
    gap: 8px;

    &__star {
      color: #000;
      opacity: 0.25;
      font-size: 25px;

      &--filled {
        color: #ffad33;
        opacity: 1;
      }
    }

    &__reviews {
      color: #000;
      opacity: 0.5;
      font-size: 14px;
      font-weight: 600;
    }
  }
}
</style>
