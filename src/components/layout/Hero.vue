<template>
  <main class="root">
    <div class="background">
      <img class="background-image" :src="heroImgArr[activeImg]" />
      <div class="background-cover" />
    </div>
    <div class="container">
      <h1 class="heading">feel the beauty of africa</h1>
      <p class="text">
        Get in touch with all the nature, life, meanings of africa only by reading articles, watching fotos and living
        the life you can see on "TRAVELLER"
      </p>
      <div class="options">
        <div class="option" @click="isLiked = !isLiked" :class="{ clicked: isLiked }">
          <Icon name="heart" class="heart" />
          <p class="number">31</p>
        </div>
        <div class="option" @click="isCommented = !isCommented" :class="{ clicked: isCommented }">
          <Icon name="comments" class="comments" />
          <p class="number">21</p>
        </div>
        <div class="option option_read">
          <Icon name="docs" />
          <p class="number">Read more</p>
        </div>
      </div>
    </div>
    <div class="pagination">
      <button
        v-for="(_, index) of heroImgArr"
        class="circle"
        :key="index"
        @click.prevent="activeImg = index"
        :class="index === activeImg ? 'active' : ''"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import Icon from "@components/partials/Icon.vue";

import { ref } from "vue";
import { heroImgArr } from "@utils/images";

const activeImg = ref(0);
const isLiked = ref<boolean>(false);
const isCommented = ref(false);
</script>

<style lang="scss" scoped>
@import "@styles/functions";

.root {
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: calc(100% - $navbar-height);
  margin-top: to-rem($navbar-height);
}

.background {
  position: absolute;
  width: 100%;
  height: 100%;

  &-image {
    position: inherit;
    z-index: -2;

    width: 100%;
    height: 100%;

    object-fit: cover;
  }

  &-cover {
    position: inherit;
    z-index: -1;

    width: 100%;
    height: 100%;

    opacity: 0.5;
    background-color: $color-black;
  }
}

.container {
  z-index: 1;

  display: flex;
  flex-direction: column;
  gap: to-rem(30);
  align-items: start;

  max-width: to-rem(900);
}

.heading,
.text,
.options {
  color: $color-white;
}

.heading {
  margin: 0;

  font-size: to-rem(48);
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: to-rem(10);
}

.text {
  font-size: to-rem(20);
  line-height: 150%;
  letter-spacing: to-rem(3);
}

.options {
  display: flex;
  gap: to-rem(20);

  .option {
    cursor: pointer;

    display: flex;
    gap: to-rem(6);
    align-items: center;
    justify-content: center;

    transition:
      color 0.2s ease-in-out,
      border 0.2s ease-in-out,
      transform 0.2s ease-in-out;

    &:hover {
      transform: scale(1.05);
    }

    .number {
      font-weight: 500;
    }

    &.clicked {
      .comments,
      .comments + .number {
        color: $color-commented;
      }

      .heart,
      .heart + .number {
        color: $color-liked;
      }
    }

    &_read {
      margin-left: to-rem(30);
      padding: to-rem(3) to-rem(10);

      color: $color-text-secondary;

      border: 1px solid $color-text-secondary;
      border-radius: to-rem(10);

      &:hover {
        color: $color-commented;
        border-color: $color-commented;
      }
    }
  }
}

.pagination {
  position: absolute;
  bottom: to-rem(30);

  display: flex;
  gap: to-rem(15);
  align-items: center;
  justify-content: center;

  .circle {
    cursor: pointer;

    aspect-ratio: 1;
    width: to-rem(12);

    background-color: $color-text-secondary;
    border: none;
    border-radius: 50%;

    &:hover {
      opacity: 0.85;
    }

    &:active {
      background-color: $color-border;
    }
  }

  .active {
    background-color: $color-white;
    transition: background-color 0.2s ease-in-out;
  }
}
</style>
