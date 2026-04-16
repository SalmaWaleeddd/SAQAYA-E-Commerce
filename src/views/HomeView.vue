<template>
  <div class="home-page">
    <div class="home-page__promotion">
      <PromotionCarousel
        :promotions="promotionList"
        :autoPlay="true"
        :autoPlayInterval="5000"
      />
    </div>
    <!-- Flash Sales Section -->
    <div class="home-page__flash-sales">
      <FlashSales :products="bestSellingProducts" />
    </div>
    <!-- Browse By Category Section -->
    <div class="home-page__categories">
      <ProductCategories :categories="categories" />
    </div>
    <!-- Explore Our Products Section -->
    <div class="home-page__explore-products">
      <ExploreProducts :products="products" />
    </div>
    <!-- Trust Badges Section -->
    <div class="home-page__trust-badges">
      <TrustBadge v-for="badge in badges" :key="badge.title" :badge="badge" />
    </div>
  </div>
</template>

<script>
import promotionImg from "@/assets/images/promotion.svg";
import AppleLogo from "@/assets/icons/apple-logo-icon.svg";
import { TRUST_BADGES } from "@/constants/trustBadges";
import PromotionCarousel from "@/components/promotions/PromotionCarousel.vue";
import FlashSales from "@/components/home/FlashSales.vue";
import ProductCategories from "@/components/home/ProductCategories.vue";
import ExploreProducts from "@/components/home/ExploreProducts.vue";
import TrustBadge from "@/components/common/TrustBadge.vue";

export default {
  name: "HomeView",
  components: {
    PromotionCarousel,
    FlashSales,
    ProductCategories,
    ExploreProducts,
    TrustBadge,
  },
  data() {
    return {
      promotionImg,
      AppleLogo,
      promotionList: [
        {
          title: "iPhone 14 Series",
          subtitle: "Up to 10% off Voucher",
          img: promotionImg,
          icon: AppleLogo,
        },
        {
          title: "iPhone 14 Series",
          subtitle: "Up to 10% off Voucher",
          img: promotionImg,
          icon: AppleLogo,
        },
        {
          title: "iPhone 14 Series",
          subtitle: "Up to 10% off Voucher",
          img: promotionImg,
          icon: AppleLogo,
        },
      ],
      // Sample products for testing
      products: [
        {
          id: 1,
          name: "HAVIT HV-G92 Gamepad",
          price: 120,
          salePrice: 96,
          discount: 20,
          stars: 4,
          reviews: 88,
          img: promotionImg,
        },
        {
          id: 2,
          name: "AK-900 Wired Keyboard",
          price: 960,
          salePrice: 880,
          discount: 8,
          stars: 5,
          reviews: 75,
          img: promotionImg,
        },
        {
          id: 3,
          name: "IPS LCD Gaming Monitor",
          price: 370,
          salePrice: null,
          discount: null,
          stars: 4,
          reviews: 99,
          img: promotionImg,
        },
        {
          id: 4,
          name: "S-Series Comfort Chair",
          price: 400,
          salePrice: 350,
          discount: 12.5,
          stars: 4,
          reviews: 45,
          img: promotionImg,
        },
        {
          id: 5,
          name: "The North Coat",
          price: 360,
          salePrice: 260,
          discount: 27,
          stars: 5,
          reviews: 65,
          img: promotionImg,
        },
        {
          id: 6,
          name: "Gucci Duffle Bag",
          price: 960,
          salePrice: 1160,
          discount: null,
          stars: 4,
          reviews: 45,
          img: promotionImg,
        },
        {
          id: 7,
          name: "RGB Liquid CPU Cooler",
          price: 160,
          salePrice: 140,
          discount: 12.5,
          stars: 5,
          reviews: 55,
          img: promotionImg,
        },
        {
          id: 8,
          name: "Small BookShelf",
          price: 360,
          salePrice: null,
          discount: null,
          stars: 4,
          reviews: 30,
          img: promotionImg,
        },
      ],
      bestSellingProducts: [
        {
          id: 5,
          name: "The North Coat",
          price: 360,
          salePrice: 260,
          discount: 27,
          stars: 5,
          reviews: 65,
          img: promotionImg,
        },
        {
          id: 6,
          name: "Gucci Duffle Bag",
          price: 960,
          salePrice: 1160,
          discount: null,
          stars: 4,
          reviews: 45,
          img: promotionImg,
        },
        {
          id: 7,
          name: "RGB Liquid CPU Cooler",
          price: 160,
          salePrice: 140,
          discount: 12.5,
          stars: 5,
          reviews: 55,
          img: promotionImg,
        },
        {
          id: 8,
          name: "Small BookShelf",
          price: 360,
          salePrice: null,
          discount: null,
          stars: 4,
          reviews: 30,
          img: promotionImg,
        },
      ],
      categories: [
        { id: 1, name: "Electronics", img: promotionImg },
        { id: 2, name: "Fashion", img: promotionImg },
        { id: 3, name: "Home & Garden", img: promotionImg },
        { id: 4, name: "Sports & Outdoors", img: promotionImg },
        { id: 5, name: "Toys & Games", img: promotionImg },
        { id: 6, name: "Health & Beauty", img: promotionImg },
      ],
      badges: TRUST_BADGES,
    };
  },
};
</script>

<style lang="scss" scoped>
.home-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  text-align: center;
  margin-bottom: 40px;

  &__promotion {
    margin-bottom: 60px;
  }

  &__flash-sales,
  &__categories,
  &__explore-products {
    margin-bottom: 60px;
  }
  &__trust-badges {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5rem;
  }
}
// Responsive design
@media (max-width: 768px) {
  .home-page {
    padding: 16px;

    &__trust-badges {
      flex-direction: column;
      gap: 2rem;
    }
  }
}
</style>
