<template>
  <div class="root">
    <div v-if="article" class="wrapper">
      <button class="back" @click="handleBack">Back</button>
      <h1>
        {{ article.title }} <span class="id">#{{ article.id }}</span>
      </h1>
      <p class="text">{{ article.body }}</p>
      <br />
      <p class="id">{{ user }}</p>
    </div>
    <div v-else class="error">Something goes wrong...</div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useArticlesStore, useUsersStore } from "@/stores";

import type { Article } from "@/types/interfaces/Article";

const store = useArticlesStore();
const usersStore = useUsersStore();
const route = useRoute();
const router = useRouter();

const article = ref<Article | null>(null);

const user = computed(() => {
  if (!article.value) return "error";
  const user = usersStore.getUser(article.value.userId);
  if (user) return user?.name + "<" + user?.email + ">";
  else return "error";
});

const loadData = async () => {
  if (store.getArticleFromStore(Number(route.params.id)) !== undefined) {
    article.value = store.getArticleFromStore(Number(route.params.id))!;
  } else {
    article.value = await store.fetchArticle(Number(route.params.id));
  }
};

loadData();

const handleBack = () => {
  router.back();
};
</script>

<style lang="scss" scoped>
@import "@styles/functions";

.root {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.back {
  cursor: pointer;

  padding: to-rem(10) to-rem(100);

  font-weight: 500;
  font-style: italic;
  color: $color-text-main;

  background: linear-gradient(270deg, $color-bg, rgb(151 186 238 / 83.6%));
  border: 2px solid $color-text-secondary;
  border-radius: to-rem(10);

  transition: all 0.3s ease-in-out;

  &:hover {
    scale: 1.05;
    border-color: $color-commented;
  }
}

.id {
  color: $color-text-secondary;
}

.text {
  font-size: to-rem(18);
}
</style>
