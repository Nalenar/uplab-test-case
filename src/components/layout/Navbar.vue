<template>
  <nav class="root">
    <Logo />
    <NavigationLinks />
  </nav>
</template>

<script setup lang="ts">
import Logo from "@components/partials/Logo.vue";
import NavigationLinks from "@components/partials/NavigationLinks.vue";
</script>

<style lang="scss" scoped>
@import "@styles/functions";

.root {
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: to-rem(70);
  padding: 0 to-rem(80);
}
</style>
