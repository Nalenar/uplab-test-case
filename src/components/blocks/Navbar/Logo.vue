<template>
  <div class="logo">
    <div class="wrapper">
      <div class="logo__circle" />
      <p class="logo__letter">T</p>
    </div>
    <p class="logo__text">raveller</p>
  </div>
</template>

<style lang="scss" scoped>
@import "@styles/functions";

.logo {
  cursor: default;

  display: flex;
  gap: to-rem(5);
  align-items: center;

  height: 100%;

  font-size: to-rem(28);
  font-weight: 500;
  text-transform: uppercase;

  &__text {
    color: $color-text-secondary;
    letter-spacing: 4px;
  }

  .wrapper {
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    width: to-rem(45);
  }

  &__circle {
    aspect-ratio: 1;
    width: 100%;
    background-color: $color-logo;
    border-radius: 50%;
  }

  &__letter {
    position: absolute;
    color: $color-white;
  }
}
</style>
