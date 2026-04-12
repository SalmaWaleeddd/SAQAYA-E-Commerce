<template>
  <app-layout>
    <!-- Router view will render different pages based on the route -->
    <router-view />
  </app-layout>
</template>

<script>
import { DefaultLayout } from "@/components/layout/DefaultLayout.vue";

export default {
  name: "App",
  components: {
    "app-layout": DefaultLayout,
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>