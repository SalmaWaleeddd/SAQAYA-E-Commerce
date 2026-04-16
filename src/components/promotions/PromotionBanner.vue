<template>
  <div class="promotion-banner">
    <div class="promotion-banner__content">
      <div class="promotion-banner__content__text">
        <div class="promotion-banner__content__text__title_container">
          <img
            v-if="promotion.icon"
            :src="promotion.icon"
            alt="Promotion Icon"
            class="promotion-banner__content__icon"
          />
          <h2 class="promotion-banner__content__text__title">
            {{ promotion.title }}
          </h2>
        </div>
        <p
          v-if="promotion.subtitle"
          class="promotion-banner__content__text__subtitle"
        >
          {{ promotion.subtitle }}
        </p>
      </div>
      <button class="promotion-banner__content__button">
        Shop Now
        <img src="@/assets/icons/arrow-right-icon.svg" alt="Arrow Right" />
      </button>
    </div>
    <img
      v-if="promotion.img"
      :src="promotion.img"
      alt="Promotion Image"
      class="promotion-banner__image"
    />
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";
import { Promotion } from "@/types/promotions";
export default {
  name: "PromotionBanner",
  props: {
    promotion: {
      type: Object as PropType<Promotion>,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.promotion-banner {
  display: flex;
  align-items: center;
  gap: 7rem;
  background-color: #000;
  padding: 3rem;

  &__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &__icon {
      width: 48px;
      height: 48px;
      margin-right: 16px;
    }

    &__text {
      color: $color-app-white;
      &__title_container {
        display: flex;
        align-items: center;
      }
      &__title {
        font-weight: 400;
        font-size: 16px;
        margin: 0;
      }

      &__subtitle {
        max-width: 250px;
        font-size: 48px;
        font-weight: bold;
        margin: 1rem 0;
      }
    }
    &__button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background-color: transparent;
      color: $color-app-white;
      border: none;
      font-weight: 500;
      font-size: 16px;
      cursor: pointer;
    }
  }
}
</style>
