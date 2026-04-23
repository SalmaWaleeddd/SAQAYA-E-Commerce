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

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useProductsStore } from "@/stores/useProductStore";
import { capitalizeFirstLetter } from "@/utils/stringUtils";

interface Breadcrumb {
  name: string;
  path: string;
  originalSegment: string;
}

const route = useRoute();
const productsStore = useProductsStore();
const currentProduct = computed(() => productsStore.$state.currentProduct);
const error = computed(() => productsStore.$state.error);
const categories = computed(() => productsStore.$state.categories);

const breadcrumbs = ref<Breadcrumb[]>([]);

const isHomePage = computed(() => route.path === "/");

function isProductId(segment: string): boolean {
  return /^\d+$/.test(segment);
}

function formatName(segment: string): string {
  if (segment === "404-error") {
    return "404 Error";
  }
  if (segment === "product") {
    return "Product";
  }
  if (isProductId(segment)) {
    return "Loading...";
  }
  let name = segment.replace(/-/g, " ");
  name = capitalizeFirstLetter(name);
  return name;
}

function getProductName(productId: string): string {
  const id = parseInt(productId, 10);
  if (currentProduct.value && currentProduct.value.id === id) {
    return currentProduct.value.title;
  }
  return `Product ${productId}`;
}

async function generateBreadcrumbs() {
  const path = route.path;
  const segments = path.split("/").filter((segment) => segment);

  const newBreadcrumbs: Breadcrumb[] = [];
  let currentPath = "";

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    currentPath += `/${segment}`;

    let displayName = formatName(segment);

    if (isProductId(segment)) {
      displayName = getProductName(segment);
    }

    newBreadcrumbs.push({
      name: displayName,
      path: currentPath,
      originalSegment: segment,
    });
  }

  breadcrumbs.value = newBreadcrumbs;
}

function isLast(index: number): boolean {
  return index === breadcrumbs.value.length - 1;
}

// Watch for route changes
watch(
  () => route.path,
  () => {
    generateBreadcrumbs();
  },
  { immediate: true },
);
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
