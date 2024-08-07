<template>
  <div class="root">
    <div class="cover" />
    <div class="images">
      <img v-for="(heroImg, index) of heroImgArr" :key="heroImg + 'key'" :src="heroImgArr[index]" class="img" />
    </div>
    <div class="btns">
      <button
        v-for="(heroImg, index) of heroImgArr"
        :key="heroImg + 'btn'"
        class="btn"
        @click="activeImage = index"
        :class="{ active: activeImage === index }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { heroImgArr } from "./utils/images";

const activeImage = ref(0);
</script>

<style lang="scss" scoped>
@import "@styles/functions";

.root {
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
}

.cover {
  position: absolute;
  z-index: -1;

  width: 100%;
  height: 100%;

  opacity: 0.5;
  background-color: $color-black;
}

.images {
  position: absolute;
  z-index: -2;
  display: flex;
  gap: to-rem(20);

  .img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.btns {
  display: flex;
  gap: 15px;

  .btn {
    aspect-ratio: 1;
    width: 15px;

    background-color: $color-text-secondary;
    border: none;
    border-radius: 50%;

    &.active {
      background-color: $color-white;
    }
  }
}
</style>
