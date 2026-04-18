<template>
  <div class="trust-badge" :class="{ 'trust-badge--with-border': hasBorder }">
    <div class="trust-badge__container">
      <div class="trust-badge__item">
        <div class="trust-badge__icon-container">
          <div class="trust-badge__icon-background">
            <img
              :src="badge.icon"
              :alt="badge.title"
              class="trust-badge__icon"
            />
          </div>
        </div>
        <h3 class="trust-badge__title">{{ badge.title }}</h3>
        <p class="trust-badge__description">{{ badge.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TrustBadge",
  props: {
    badge: {
      type: Object,
      required: true,
    },
    hasBorder: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.trust-badge {
  margin: 3rem 0;
  &:hover {
    background-color: $color-primary;

    .trust-badge__title,
    .trust-badge__description {
      color: #fff;
    }

    .trust-badge__icon-background {
      background-color: #fff;
    }

    .trust-badge__icon-container {
      background-color: rgba(255, 255, 255, 0.3);
    }
  }

  &--with-border {
    .trust-badge__container {
      border: 1px solid rgb(0, 0, 0, 0.3);
      border-radius: 4px;
      padding: 20px;
    }
  }

  &__container {
    width: 250px;
  }

  &__item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__icon-container {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(47, 46, 48, 0.3);
  }

  &__icon-background {
    background-color: #000;
    padding: 20px;
    border-radius: 50%;
    width: 58px;
    height: 58px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__icon {
    width: 40px;
    height: 40px;
    object-fit: contain;
    border-radius: 50%;
  }

  &__title {
    font-size: 20px;
    font-weight: 600;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    white-space: nowrap;
  }

  &__description {
    font-size: 14px;
    font-weight: 400;
  }
}
</style>
