<template>
  <nav class="root">
    <div class="logo">
      <div class="wrapper">
        <div class="logo__circle" />
        <span class="logo__letter">T</span>
      </div>
      <p class="logo__text">raveler</p>
    </div>
    <ul class="links">
      <li class="link active">Blog</li>
      <li class="link">Articles</li>
      <li class="link">Gallery</li>
      <li class="link">Contact</li>
    </ul>
  </nav>
</template>

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
    color: var(--color-text-secondary);
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
    background-color: var(--color-logo);
    border-radius: 50%;
  }

  &__letter {
    position: absolute;
    color: var(--color-white);
  }
}

.links {
  display: flex;
  gap: to-rem(15);

  .link {
    cursor: default;

    font-size: to-rem(18);
    font-weight: 500;
    color: var(--color-text-secondary);
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
    color: var(--color-logo);
  }
}
</style>
