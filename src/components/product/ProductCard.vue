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
        @click="goToProductDetail"
        loading="lazy"
        decoding="async"
      />
      <div class="product-card__img-container__actions">
        <button class="product-card__img-container__actions__btn">
          <img src="@/assets/icons/fav-icon.svg" alt="Add to favorites" />
        </button>
        <button
          class="product-card__img-container__actions__btn"
          @click="goToProductDetail"
        >
          <img src="@/assets/icons/eye-icon.svg" alt="Quick view" />
        </button>
      </div>

      <BaseButton
        class="product-card__img-container__add-to-cart"
        @click="handleAddToCart"
        variant="secondary"
      >
        Add to Cart
      </BaseButton>
    </div>

    <h3 class="product-card__title" @click="goToProductDetail">
      {{ product.title }}
    </h3>

    <!-- Price Section -->
    <div class="product-card__price-wrapper">
      <!-- Sale price -->
      <p class="product-card__price-wrapper__price-sale">
        {{ formatPrice(getSalePrice()) }}
      </p>
      <!-- Original price -->
      <p v-if="hasDiscount" class="product-card__price-wrapper__price-original">
        {{ formatPrice(product.price) }}
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

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { formatPrice } from "@/utils/stringUtils";
import BaseButton from "../ui/BaseButton.vue";
import type { Product } from "@/types/product";

// Props
interface Props {
  product: Product;
}

const props = defineProps<Props>();

const emit = defineEmits(['add-to-cart']);

// Router
const router = useRouter();

// Computed properties
const hasDiscount = computed(() => !!props.product.discountPercentage);

// Methods
function getSalePrice(): number {
  if (props.product.discountPercentage) {
    return props.product.price * (1 - props.product.discountPercentage / 100);
  }
  return props.product.price;
}

function getRating(): number {
  const rating = props.product.rating || 0;
  return Math.floor(rating);
}

function getReviewCount(): number {
  return props.product.rating;
}

function handleAddToCart(): void {
  emit("add-to-cart", props.product);
}

function goToProductDetail(): void {
  router.push(`/products/${props.product.id}`);
  window.scrollTo(0, 0);
}
</script>

<style lang="scss" scoped>
.product-card {
  background: white;
  border-radius: 4px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    .product-card__img-container__actions {
      opacity: 1;
    }

    .product-card__img-container__add-to-cart {
      transform: translateY(0);
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
      cursor: pointer;

      &:hover {
        transform: scale(1.05);
      }
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

    &__add-to-cart {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      transition: transform 0.3s ease, opacity 0.3s ease;
      transform: translateY(100%);
      z-index: 2;
    }
  }

  &__title {
    font-size: 16px;
    font-weight: 500;
    margin: 0 0 8px 0;
    color: #000;
    line-height: 1.4;
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: $color-primary;
    }
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