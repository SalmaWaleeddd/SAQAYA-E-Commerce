<template>
  <div class="promotion-carousel">
    <!-- Promotions Container -->
    <div class="promotion-carousel__container">
      <div class="promotion-carousel__wrapper">
        <PromotionBanner 
          v-for="(promo, index) in promotions" 
          :key="index"
          :promotion="promo"
          class="promotion-carousel__slide"
        />
      </div>
    </div>
    
    <!-- Circular Dots Indicators  -->
    <div class="promotion-carousel__dots">
      <button
        v-for="(_, index) in promotions"
        :key="index"
        class="promotion-carousel__dot"
        :class="{ 'promotion-carousel__dot--active': index === 0 }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";
import { Promotion } from "@/types/promotions";
import PromotionBanner from "./PromotionBanner.vue";

export default {
  name: "PromotionCarousel",
  components: {
    PromotionBanner,
  },
  props: {
    promotions: {
      type: Array as PropType<Promotion[]>,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.promotion-carousel {
  position: relative;
  margin-bottom: 24px;

  &__container {
    overflow: hidden;
  }

  &__wrapper {
    display: flex;
  }

  &__slide {
    flex: 0 0 100%;
    min-width: 0;
  }

  // Circular Dots
  &__dots {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 12px;
    z-index: 10;
  }

  &__dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    border: none;
    cursor: pointer;
    padding: 0;
    transition: all 0.3s ease;
    
    // Active dot style (first dot active by default)
    &--active {
      background: white;
      width: 24px;
      border-radius: 5px;
    }

    // Hover effect for better UX
    &:hover {
      background: rgba(255, 255, 255, 0.8);
    }
  }
}
</style>