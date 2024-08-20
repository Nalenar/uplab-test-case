<template>
  <ul class="links">
    <li class="link active">Blog</li>
    <li class="link">Articles</li>
    <li class="link">Gallery</li>
    <li class="link">Contact</li>
  </ul>
</template>

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
