<template>
  <div class="root">
    <Carousel class="carousel" v-slot="{ currentSlide }">
      <Slide v-for="(slide, index) in carouselSlides" :key="index">
        <div v-show="currentSlide === index" class="slide-info">
          <img :src="slide" alt="" />
        </div>
      </Slide>
    </Carousel>
  </div>
</template>

<script setup lang="ts">
import Carousel from "@components/blocks/Carousel/Carousel.vue";
import Slide from "@components/blocks/Carousel/Slide.vue";
import { heroImgArr } from "@utils/images";

const carouselSlides = heroImgArr.slice();
</script>

<style lang="scss" scoped>
.root {
  width: 100%;
  height: 100%;
}

.carousel {
  position: relative;
  height: 100%;

  .slide-info {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
    max-height: 100%;

    img {
      width: 100%;
      min-width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
