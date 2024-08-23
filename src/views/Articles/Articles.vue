<template>
  <div class="root">
    <ArticlesHeader isWithFilters title="All Articles" />
    <div class="margin" />
    <ul class="articles" v-if="isArticlesExist && !loading">
      <Article v-for="article in store.articles" :key="article.id" :article />
    </ul>
    <p v-else class="loading">Loading...</p>
    <div class="btns">
      <button v-if="!loading && store.articles.length !== 100" class="load" @click="handleLoadMore">
        Load more...
      </button>
      <p v-else-if="loading" class="loading">Loading...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArticlesHeader } from "@views/Home";
import { Article } from "./components";

import { computed, onMounted, ref, watch } from "vue";

import { useArticlesStore } from "@/stores";

const store = useArticlesStore();

// отвечает за подгрузку постов, передается в url запроса
const counter = ref<number>(1);
const loading = ref<boolean>(false);

const isArticlesExist = computed(() => store.articles && store.articles.length > 0);

const handleLoadMore = () => {
  counter.value++;
};

onMounted(() => {
  loading.value = true;
  store.$reset();
  store.fetchArticlesByPage(counter.value);
  loading.value = false;
});

watch(counter, () => {
  loading.value = true;
  store.fetchArticlesByPage(counter.value);
  loading.value = false;
});
</script>

<style lang="scss" scoped>
@import "@styles/functions";

.root {
  width: 100%;
  height: 100%;
  padding: to-rem(30) to-rem(50);
}

.margin {
  margin-top: to-rem(30);
}

.articles {
  display: flex;
  flex-direction: column;
  gap: to-rem(20);
  width: 100%;
}

.loading {
  width: 100%;
  font-size: to-rem(24);
  color: $color-logo;
  text-align: center;
}

.btns {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  padding: to-rem(30);

  .load {
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
}
</style>
