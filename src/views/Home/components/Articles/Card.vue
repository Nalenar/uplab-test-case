<template>
  <div class="card">
    <img :src="props.card.image" />
    <div class="wrapper">
      <div class="info">
        <p class="posted">posted on: {{ props.card.date }}</p>
        <p class="heading">{{ props.card.title }}</p>
      </div>
      <p class="text">
        {{ props.card.text }}
      </p>
      <Details color="#a4a3a3" gap="10" class="details" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Details } from "@/components/blocks";

interface Props {
  card: {
    image: string;
    date: string;
    title: string;
    text: string;
  };
}

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
@import "@styles/functions";

.card {
  display: flex;
  flex-direction: column;
  justify-content: start;

  background-color: $color-white;
  box-shadow: 5px 5px 15px -7px $color-text-secondary;

  .wrapper {
    display: flex;
    flex-direction: column;
    gap: to-rem(25);

    height: 100%;
    padding: to-rem(30) to-rem(20);
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: to-rem(5);
  }

  .posted,
  .heading {
    text-transform: uppercase;
  }

  .posted {
    font-size: to-rem(11);
    font-weight: 300;
    color: $color-text-secondary;
  }

  .heading {
    font-size: to-rem(20);
    font-weight: 500;
    color: $color-logo;
    letter-spacing: 1.5px;
  }

  .text {
    font-size: to-rem(14);
    line-height: 150%;
    color: $color-text-secondary;
    letter-spacing: to-rem(1);
    word-break: break-all;
  }

  .details {
    margin-top: auto;
  }

  img {
    width: 100%;
  }
}
</style>
