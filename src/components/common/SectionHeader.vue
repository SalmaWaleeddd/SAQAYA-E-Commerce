<template>
  <div class="section-header">
    <div class="section-header__marker"></div>
    <div class="section-header__content">
      <h3 class="section-header__subtitle">{{ subtitle }}</h3>
      <h2 class="section-header__title">{{ title }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "SectionHeader",
  props: {
    subtitle: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
.section-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 40px;

  &__marker {
    width: 20px;
    height: 40px;
    background: $color-primary;
    border-radius: 4px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__subtitle {
    color: $color-primary;
    font-size: 16px;
    font-weight: 600;
    margin: 0;
  }

  &__title {
    font-size: 36px;
    font-weight: 600;
    color: #000;
    margin: 0;
  }
}
</style>