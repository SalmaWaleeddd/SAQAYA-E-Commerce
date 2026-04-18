<template>
  <div class="products-sorting">
    <label class="products-sorting__label">Sort by:</label>
    <select 
      class="products-sorting__select"
      :value="currentSort"
      @change="handleChange"
    >
      <option 
        v-for="option in SORT_OPTIONS" 
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { SORT_OPTIONS } from "@/constants/products";

export default {
  name: "ProductsSorting",
  props: {
    currentSort: {
      type: String,
      default: "default",
    },
  },
  data() {
    return {
      SORT_OPTIONS,
    };
  },
  methods: {
    handleChange(event: Event) {
      const target = event.target as HTMLSelectElement;
     (this as any).$emit("sort-change", target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.products-sorting {
  display: flex;
  align-items: center;
  gap: 12px;

  &__label {
    font-size: 20px;
    color: #000;
  }

  &__select {
    padding: 10px 32px 10px 16px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    font-size: 14px;
    background-color: white;
    cursor: pointer;

    &:hover {
      border-color: $color-primary;
    }

    &:focus {
      outline: none;
      border-color: $color-primary;
      box-shadow: 0 0 0 2px rgba($color-primary, 0.2);
    }
  }
}
</style>