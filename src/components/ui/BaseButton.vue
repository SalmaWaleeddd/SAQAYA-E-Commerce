<template>
  <button
    class="base-btn"
    :class="[`base-btn--${variant}`, { 'base-btn--full-width': fullWidth }]"
    @click="$emit('click', $event)"
  >
    <slot>{{ text }}</slot>
  </button>
</template>

<script setup lang="ts">
interface Props {
  text?: string;
  variant?: "primary" | "secondary" | "outline";
  fullWidth?: boolean;
}

interface Emits {
  (e: "click", event: MouseEvent): void;
}

// Props with defaults
const props = withDefaults(defineProps<Props>(), {
  text: "",
  variant: "primary",
  fullWidth: false,
});

// Emits
const emit = defineEmits<Emits>();
</script>

<style lang="scss" scoped>
.base-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  padding: 12px 30px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  // Variant styles
  &--primary {
    background-color: $color-primary;
    color: #fff;

    &:hover {
      background-color: darken($color-primary, 10%);
    }
  }

  &--secondary {
    background-color: #000;
    color: #fff;

    &:hover {
      background-color: darken(#6c757d, 10%);
    }
  }

  &--outline {
    background-color: transparent;
    border: 1px solid $color-primary;
    color: $color-primary;

    &:hover {
      background-color: $color-primary;
      color: #fff;
    }
  }

  // Full width option
  &--full-width {
    width: 100%;
  }
}
</style>