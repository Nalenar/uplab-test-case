<template>
  <nav class="root">
    <Logo />
    <NavbarLinks />
  </nav>
</template>

<script setup lang="ts">
import { Logo, NavbarLinks } from "@/components/blocks";
</script>

<style lang="scss" scoped>
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
