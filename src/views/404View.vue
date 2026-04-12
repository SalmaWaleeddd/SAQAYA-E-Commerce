<template>
  <div class="not-found-page">
    <h1 class="not-found-page__title">404 Not Found</h1>
    <p class="not-found-page__message">Your visited page not found. You may go home page.</p>
    <BaseButton @click="$router.push('/')" variant="primary">Back to home page</BaseButton>
  </div>
</template>
<script>
import BaseButton from "@/components/ui/BaseButton.vue";

export default {
  name: "NotFoundView",
    components: {
        BaseButton,
    },
};
</script>
<style lang="scss" scoped>
.not-found-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 40px;
    
    &__title {
        font-size: 110px;
        font-weight: 500;
        color: #000;
        margin: 0;
    }
    
    &__message {
        font-size: 16px;
        font-weight: 400;
        margin-bottom: 30px;
    }

    @media(max-width: 768px) {
        &__title {
            font-size: 60px;
        }
    }

}
</style>
