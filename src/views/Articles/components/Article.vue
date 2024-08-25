<template>
  <li class="article" @click="handleRedirect">
    <p class="article__title">{{ props.article.title }}</p>
    <p class="article__body">{{ props.article.body }}</p>
    <div class="wrapper">
      <p class="article__user">{{ user }}</p>
      <p class="article__id">#{{ props.article.id }}</p>
    </div>
  </li>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";

import { useUsersStore } from "@/stores";

import type ArticleProps from "@/types/interfaces/Article";

const props = defineProps<ArticleProps>();
const router = useRouter();
const store = useUsersStore();

const user = computed(() => {
  const user = store.getUser(props.article.userId);
  if (user) return user?.name + "<" + user?.email + ">";
  else return "error";
});

const handleRedirect = () => {
  router.push(`/articles/${props.article.id}`);
};
</script>

<style lang="scss" scoped>
.article {
  cursor: pointer;

  display: flex;
  flex-direction: column;
  gap: to-rem(10);
  align-items: start;

  padding: to-rem(15);

  background: linear-gradient(270deg, $color-bg, rgb(151 186 238 / 83.6%));
  border: 1px solid $color-text-secondary;
  border-radius: 10px;
  box-shadow: 10px 7px 12px -1px $color-text-secondary;

  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translate(5px, 5px);
    border-color: $color-commented;
    box-shadow: 10px 7px 12px 2px $color-text-secondary;
  }

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  &__id {
    font-size: to-rem(14);
    color: $color-text-secondary;
    text-align: end;
  }

  &__title {
    font-size: to-rem(24);
    font-weight: 600;
    color: $color-logo;
  }

  &__body {
    font-size: to-rem(16);
  }

  &__user {
    font-weight: 300;
    font-style: italic;
    color: rgb(94 94 196);
  }
}
</style>
