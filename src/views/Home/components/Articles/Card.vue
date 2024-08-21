<template>
  <div class="card">
    <div class="wrapper">
      <div class="info">
        <p class="heading">{{ props.article.title }}</p>
      </div>
      <p class="text">
        {{ props.article.body }}
      </p>
      <Details color="#a4a3a3" gap="10" class="details" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Details } from "@/components/blocks";
import type ArticleProps from "@/types/interfaces/Article";

const props = defineProps<ArticleProps>();
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
}
</style>
