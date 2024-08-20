<template>
  <Navbar />
  <main>
    <slot />
  </main>
</template>

<script setup lang="ts">
import { Navbar } from "@components/blocks";
</script>

<style lang="scss" scoped>
@import "@styles/functions";

main {
  width: 100%;
  height: calc(100% - $navbar-height);
  margin-top: to-rem($navbar-height);
}
</style>
