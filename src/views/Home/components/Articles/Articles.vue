<template>
  <div class="root">
    <ArticlesHeader title="Newest articles" v-model:select="nullModel" v-model:search="nullModel" />

    <div class="margin">
      <div v-if="articles && articles.length > 0" class="cards">
        <Card v-for="article of articles" :key="article.id" :article />
      </div>
      <p v-else class="error">Something went wrong...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Card, ArticlesHeader } from "@/views/Home";

import { ref } from "vue";

import type { Article } from "@/types/interfaces/Article";

const articles = ref<Article[] | null>(null);
const nullModel = ref(null);

fetch(import.meta.env.VITE_API_URL + "/posts?_limit=8")
  .then((res) => res.json())
  .then((json) => (articles.value = json))
  .catch((error) => console.log(error));
</script>

<style lang="scss" scoped>
.root {
  width: 100%;
  padding: to-rem(40) to-rem(60);
}

.margin {
  margin-top: to-rem(50);
}

.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: to-rem(40);
  width: 100%;
}

.error {
  width: 100%;
  font-size: to-rem(24);
  color: $color-logo;
  text-align: center;
}
</style>
