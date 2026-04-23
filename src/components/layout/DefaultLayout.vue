<template>
  <div class="layout">
    <DefaultHeader />

    <!-- Add CartSidebar component -->
    <CartSidebar />

    <main class="layout__main">
      <div class="layout__container">
        <BreadCrumb />
        <slot />
      </div>
    </main>

    <DefaultFooter />
  </div>
</template>

<script setup lang="ts">
import DefaultHeader from "./DefaultHeader.vue";
import DefaultFooter from "./DefaultFooter.vue";
import CartSidebar from "@/components/cart/CartSidebar.vue";
import BreadCrumb from "@/components/common/BreadCrumb.vue";
</script>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout__main {
  flex: 1;
  padding: 48px 0;
}

.layout__container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

@media (max-width: 768px) {
  .layout__main {
    padding: 32px 0;
  }

  .layout__container {
    padding: 0 16px;
  }
}
</style>
