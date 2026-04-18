<template>
  <div class="about-hero">
    <div class="about-hero__content">
      <h1 class="about-hero__title">Our Story</h1>
      <p class="about-hero__description">
        Launced in 2015, Exclusive is South Asia’s premier online shopping
        makterplace with an active presense in Bangladesh. Supported by wide
        range of tailored marketing, data and service solutions, Exclusive has
        10,500 sallers and 300 brands and serves 3 millioons customers across
        the region.
      </p>
      <p class="about-hero__description">
        Exclusive has more than 1 Million products to offer, growing at a very
        fast. Exclusive offers a diverse assotment in categories ranging from
        consumer.
      </p>
    </div>
    <div class="about-hero__image">
      <img src="@/assets/images/about-hero-img.svg" alt="Our Story" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "AboutHero",
};
</script>

<style lang="scss" scoped>
.about-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  margin-bottom: 80px;

  &__title {
    font-size: 54px;
    font-weight: 600;
    margin: 0 0 24px 0;
    color: #000;
    line-height: 1.2;
  }

  &__description {
    font-size: 16px;
    line-height: 1.6;
    color: #000;
    margin-bottom: 20px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  &__image {
    img {
      width: 100%;
      height: auto;
      border-radius: 8px;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
    margin-bottom: 60px;

    &__title {
      font-size: 32px;
    }
  }
}
</style>
