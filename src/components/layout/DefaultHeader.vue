<template>
  <header class="header">
    <div class="header__container">
      <div class="header__logo">
        <h1 class="header__logo__text">Exclusive</h1>
      </div>
      <nav class="header__nav">
        <ul>
          <li v-for="item in navItems" :key="item.path">
            <router-link
              :to="item.path"
              active-class="active"
              exact-active-class="exact-active"
            >
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </nav>

      <div class="header__actions">
        <!-- search bar -->
        <div class="header__search-bar">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="What are you looking for?"
            @keyup.enter="handleSearch"
          />
          <button @click="handleSearch">
            <img src="@/assets/icons/search-icon.svg" alt="Search" />
          </button>
        </div>

        <!-- cart -->
        <div class="header__cart">
          <button class="cart-button" @click="openCartSidebar">
            <div class="cart-icon-wrapper">
              <img
                src="@/assets/icons/cart-icon.svg"
                alt="Cart"
                class="cart-icon"
              />
              <span v-if="cartItemsCount > 0" class="cart-badge">{{
                cartItemsCount
              }}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useCartStore } from "@/stores/useCartStore";
import { NAV_ITEMS } from "@/constants/layout";

interface NavItem {
  path: string;
  name: string;
}

const router = useRouter();
const route = useRoute();
const cartStore = useCartStore();

const navItems = ref<NavItem[]>(NAV_ITEMS);
const searchQuery = ref("");

const { cartItemCount } = storeToRefs(cartStore);
const cartItemsCount = cartItemCount;

function handleSearch(): void {
  if (searchQuery.value.trim()) {
    console.log("Searching for:", searchQuery.value);
    router.push({
      path: "/search",
      query: { q: searchQuery.value },
    });
  }
}

function openCartSidebar(): void {
  cartStore.openCart();
}

// Watch for route changes to clear search
watch(
  () => route.path,
  () => {
    searchQuery.value = "";
  }
);
</script>

<style lang="scss" scoped>
.header {
  padding: 2rem;

  &__container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fff;
    border-bottom: 0.5px solid #000;
    padding-bottom: 1rem;
  }

  &__logo {
    &__text {
      font-size: 24px;
      font-weight: bold;
      color: #000;
      margin: 0;
    }
  }

  &__nav {
    ul {
      display: flex;
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        margin-right: 20px;

        a {
          text-decoration: none;
          color: #000;
          font-size: 16px;
          font-weight: 400;
          padding-bottom: 8px;
          transition: all 0.3s ease;

          &:hover {
            color: $color-primary;
          }

          &.exact-active {
            border-bottom: 1px solid #000;
          }
        }
      }
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  &__search-bar {
    display: flex;
    align-items: center;
    height: 36px;
    background-color: #f5f5f5;
    border-radius: 4px;
    overflow: hidden;

    input {
      height: 100%;
      padding: 0 12px;
      font-size: 12px;
      border: none;
      background-color: #f5f5f5;
      width: 200px;
      outline: none;

      &:focus {
        background-color: #eeeeee;
      }
    }

    button {
      height: 100%;
      border: none;
      background-color: #f5f5f5;
      cursor: pointer;
      padding: 0 12px;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 16px;
        height: 16px;
      }

      &:hover {
        background-color: $color-primary;

        img {
          filter: brightness(0) invert(1);
        }
      }
    }
  }

  &__cart {
    .cart-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      position: relative;
      transition: transform 0.2s ease;

      &:hover {
        transform: scale(1.05);
      }

      &:active {
        transform: scale(0.95);
      }
    }

    .cart-icon-wrapper {
      position: relative;
      display: inline-block;

      .cart-icon {
        width: 24px;
        height: 24px;
        display: block;
      }

      .cart-badge {
        position: absolute;
        top: -8px;
        right: -12px;
        background-color: $color-primary;
        color: white;
        font-size: 11px;
        font-weight: bold;
        min-width: 18px;
        height: 18px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 4px;
        box-sizing: border-box;
        line-height: 1;
        animation: bounceIn 0.3s ease;
      }
    }
  }
}

@keyframes bounceIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 1rem;

    &__container {
      flex-wrap: wrap;
      gap: 16px;
    }

    &__logo {
      &__text {
        font-size: 20px;
      }
    }

    &__nav {
      order: 3;
      width: 100%;

      ul {
        justify-content: center;
        flex-wrap: wrap;
        gap: 12px;

        li {
          margin: 0 12px;

          a {
            font-size: 14px;
          }
        }
      }
    }

    &__actions {
      order: 2;
    }

    &__search-bar {
      input {
        width: 150px;
      }
    }
  }
}

@media (max-width: 480px) {
  .header {
    &__search-bar {
      input {
        width: 120px;
      }
    }

    &__actions {
      gap: 1rem;
    }
  }
}
</style>