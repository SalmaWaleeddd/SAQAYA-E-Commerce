<template>
  <div class="product-gallery">
    <div class="product-gallery__thumbnails">
      <div 
        v-for="(image, index) in images" 
        :key="index"
        class="product-gallery__thumbnail"
        :class="{ 'product-gallery__thumbnail--active': activeImage === index }"
        @click="activeImage = index"
      >
        <img :src="image" :alt="title" />
      </div>
    </div>
    <div class="product-gallery__main">
      <img :src="images[activeImage]" :alt="title" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "ProductGallery",
  props: {
    images: {
      type: Array as () => string[],
      required: true,
      default: () => [],
    },
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      activeImage: 0,
    };
  },
  watch: {
    images: {
      handler(newImages: string[]) {
        if (newImages && newImages.length > 0) {
          (this as any).activeImage = 0;
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.product-gallery {
  display: flex;
  gap: 20px;

  &__thumbnails {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100px;
    flex-shrink: 0;
  }

  &__thumbnail {
    width: 100px;
    height: 100px;
    border-radius: 4px;
    background: #fafafa;
    overflow: hidden;
    cursor: pointer;
    transition: border-color 0.2s ease;

    &:hover {
      border-color: $color-primary;
    }

    &--active {
      border-color: $color-primary;
      box-shadow: 0 0 0 2px rgba($color-primary, 0.2);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__main {
    flex: 1;
    border: 1px solid #eee;
    border-radius: 8px;
    overflow: hidden;
    background: #fafafa;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;

    img {
      max-width: 100%;
      max-height: 500px;
      object-fit: contain;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column-reverse;

    &__thumbnails {
      flex-direction: row;
      width: 100%;
      overflow-x: auto;
      padding-bottom: 8px;
    }

    &__thumbnail {
      width: 80px;
      height: 80px;
      flex-shrink: 0;
    }
  }
}
</style>