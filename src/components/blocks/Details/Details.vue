<template>
  <div class="options">
    <div class="option" :style="{ color: props.color }" @click="isLiked = !isLiked" :class="{ clicked: isLiked }">
      <Icon name="heart" class="heart" />
      <p class="number">31</p>
    </div>
    <div
      class="option"
      :style="{ color: props.color }"
      @click="isCommented = !isCommented"
      :class="{ clicked: isCommented }"
    >
      <Icon name="comments" class="comments" />
      <p class="number">21</p>
    </div>
    <div class="option option_read" :style="{ marginLeft: props.gap ? props.gap + `px` : `30px` }">
      <Icon name="docs" />
      <p class="number">Read more</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@components/partials";
import { ref } from "vue";

interface Props {
  gap?: string;
  color: string;
}

const props = defineProps<Props>();

const isCommented = ref<boolean>(false);
const isLiked = ref<boolean>(false);
</script>

<style lang="scss" scoped>
@import "@styles/functions";

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
</style>
