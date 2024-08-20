<template>
  <nav class="root">
    <Logo />
    <NavigationLinks />
  </nav>
</template>

<script setup lang="ts">
import { Logo, NavigationLinks } from "@/components/blocks";
</script>

<style lang="scss" scoped>
@import "@styles/functions";

.root {
  position: fixed;
  z-index: 20;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: to-rem($navbar-height);
  padding: 0 to-rem(80);

  background-color: $color-white;
}
</style>
