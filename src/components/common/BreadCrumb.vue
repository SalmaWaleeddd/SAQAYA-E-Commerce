<template>
  <div v-if="!isHomePage" class="bread-crumb">
    <router-link to="/" class="breadcrumb__link"> Home </router-link>

    <span
      v-for="(crumb, index) in breadcrumbs"
      :key="index"
      class="bread-crumb__item"
    >
      <span class="bread-crumb__separator">/</span>

      <router-link
        v-if="!isLast(index)"
        :to="crumb.path"
        class="bread-crumb__link"
      >
        {{ crumb.name }}
      </router-link>

      <span v-else class="bread-crumb__current">
        {{ crumb.name }}
      </span>
    </span>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "BreadCrumb",
  data() {
    return {
      breadcrumbs: [],
      productName: null,
    };
  },
  computed: {
    isHomePage() {
      return this.$route.path === "/";
    },
    ...mapState("products", {
      currentProduct: (state) => state.currentProduct,
    }),
  },
  watch: {
    $route: {
      handler() {
        this.generateBreadcrumbs();
      },
      immediate: true,
    },
  },
  methods: {
    async generateBreadcrumbs() {
      const path = this.$route.path;
      const segments = path.split("/").filter((segment) => segment);

      const breadcrumbs = [];
      let currentPath = "";

      for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        currentPath += `/${segment}`;

        let displayName = this.formatName(segment);

        // Check if this is a product ID segment (numeric)
        if (this.isProductId(segment)) {
          displayName = await this.getProductName(segment);
        }

        breadcrumbs.push({
          name: displayName,
          path: currentPath,
          originalSegment: segment,
        });
      }

      this.breadcrumbs = breadcrumbs;
    },

    isProductId(segment) {
      // Check if segment is a number (product ID)
      return /^\d+$/.test(segment);
    },

    getProductName(productId) {
      // If currentProduct matches, return its title
      if (this.currentProduct && this.currentProduct.id === productId) {
        return this.currentProduct.title;
      }

      // Fallback: if no match, just return a placeholder
      return `Product ${productId}`;
    },

    formatName(segment) {
      if (segment === "404-error") {
        return "404 Error";
      }

      if (segment === "product") {
        return "Product";
      }

      if (this.isProductId(segment)) {
        return "Loading..."; // Temporary text while fetching
      }

      let name = segment.replace(/-/g, " ");
      name = name.charAt(0).toUpperCase() + name.slice(1);
      return name;
    },

    isLast(index) {
      return index === this.breadcrumbs.length - 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.bread-crumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 16px 0;
  margin-bottom: 20px;

  a,
  &__link {
    color: #000;
    opacity: 0.5;
    font-size: 14px;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: $color-primary;
      opacity: 1;
    }
    &:active,
    &:visited {
      color: #000;
      opacity: 0.5;
      text-decoration: none;
    }
  }

  &__separator {
    margin: 0 8px;
    color: #000;
    opacity: 0.5;
    font-size: 14px;
  }

  &__current {
    color: #000;
    font-size: 14px;
    font-weight: 500;
  }
}
</style>