<template>
  <ul class="links">
    <RouterLink v-for="(route, index) of routes" :key="index" :to="route.path" active-class="active" class="link">{{
      route.name
    }}</RouterLink>
    <!-- <li class="link">Gallery</li> -->
  </ul>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";

const router = useRouter();

const routes = router.getRoutes().filter((route) => !["test"].includes(route.name?.toString()!));
</script>

<style lang="scss" scoped>
@import "@styles/functions";

.links {
  display: flex;
  gap: to-rem(15);

  .link {
    cursor: default;

    font-size: to-rem(18);
    font-weight: 500;
    color: $color-text-secondary;
    text-decoration: none;
    text-transform: uppercase;

    background-image: linear-gradient(currentcolor, currentcolor);
    background-repeat: no-repeat;
    background-position: 0% 100%;
    background-size: 0% 2px;

    transition: background-size 0.3s;

    &:hover {
      cursor: pointer;
      background-size: 100% 2px;
    }
  }

  .active {
    color: $color-logo;
  }
}
</style>
