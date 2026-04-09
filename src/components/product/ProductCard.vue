<template>
  <div class="product-card">
    <div class="product-card__img-container">
      <div
        v-if="product.discount"
        class="product-card__img-container__discount"
      >
        -{{ product.discount }}%
      </div>
      <img
        :src="product.img"
        :alt="product.name"
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

    <h3 class="product-card__title">{{ product.name }}</h3>

    <!-- Price Section - FIXED LOGIC -->
    <div class="product-card__price-wrapper">
      <!-- Sale price (current price) -->
      <p class="product-card__price-wrapper__price-sale">
        ${{ formatPrice(product.salePrice || product.price) }}
      </p>
      <!-- Original price (crossed out) - only shown if on sale -->
      <p
        v-if="product.discount || product.salePrice"
        class="product-card__price-wrapper__price-original"
      >
        ${{ formatPrice(product.price) }}
      </p>
    </div>

    <!-- Rating Section -->
    <div class="product-card__rating">
      <span
        v-for="n in 5"
        :key="n"
        class="product-card__rating__star"
        :class="{ 'product-card__rating__star--filled': n <= product.stars }"
        >★</span
      >
      <span class="product-card__rating__reviews">({{ product.reviews }})</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      required: true,
      validator: (value) => {
        return value.name && value.price !== undefined;
      },
    },
  },
  methods: {
    formatPrice(price) {
      if (typeof price === "number") {
        return price.toFixed(2);
      }
      return parseFloat(price).toFixed(2);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
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

    // Sale price (current price)
    &__price-sale {
      color: $color-primary;

      margin: 0;
    }

    // Original price (crossed out) - GRAY
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
