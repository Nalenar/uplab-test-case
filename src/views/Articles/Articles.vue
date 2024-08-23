<template>
  <div class="root">
    <ArticlesHeader
      title="All Articles"
      isWithFilters
      v-model:select="filters.select"
      v-model:search="filters.search"
      @search="handleSearch"
    />
    <div class="margin" />
    <ul class="articles" v-if="isArticlesExist && !loading">
      <Article v-for="article in store.articles" :key="article.id" :article />
    </ul>
    <p v-else class="loading">Loading...</p>
    <div class="btns">
      <p v-if="loading" class="loading">Loading...</p>
      <button v-else-if="isShowLoadBtn" class="load" @click="handleLoadMore">Load more...</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArticlesHeader } from "@views/Home";
import { Article } from "./components";

import { computed, onMounted, reactive, ref, watch } from "vue";

import { useArticlesStore } from "@/stores";

import type { IOption } from "@/types";

const store = useArticlesStore();

// отвечает за подгрузку постов, передается в url запроса, начинается с 1
const counter = ref(1);
const loading = ref(false);

const filters = reactive<{ select: IOption["value"]; search: string | null }>({
  select: null,
  search: null,
});

const isArticlesExist = computed(() => store.articles && store.articles.length > 0);

const isShowLoadBtn = computed(() => {
  if (filters.select !== null || (filters.search && filters.search.length > 0)) return false;
  if (store.articles.length >= 100) return false;
  return true;
});

const handleLoadMore = () => {
  counter.value++;
};

const handleSearch = () => {
  loading.value = true;

  if (filters.search && filters.search.length > 0) store.filterArticlesBySearch(filters.search);

  loading.value = false;
};

// подгрузка начальных 20 постов
onMounted(() => {
  loading.value = true;

  store.$reset();
  store.fetchArticlesByPage(counter.value);

  loading.value = false;
});

// последующая подгрузка постов, следующая за нажатием кнопки "Load more"
watch(counter, () => {
  loading.value = true;

  store.fetchArticlesByPage(counter.value);
  loading.value = false;
});

watch(
  () => filters.select,
  () => {
    loading.value = true;
    store.fetchArticlesByUserId(Number(filters.select));
    loading.value = false;
  },
);

// если инпут пустой инициализурем 20 карточек
watch(
  () => filters.search,
  () => {
    if (!filters.search || filters.search.length === 0) {
      store.$reset();
      store.fetchArticlesByPage(1);
    }
  },
);
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
