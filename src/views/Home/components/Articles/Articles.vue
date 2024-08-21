<template>
  <div class="root">
    <div class="header">
      <Select
        class="select"
        :class="{ active: select !== null }"
        :options="usersList"
        with-null-option
        placeholder="Choose user"
        v-model="select"
      />
      <p class="heading">Newest articles</p>
      <div class="search" :class="{ focused: isInputFocused }">
        <input
          type="search"
          placeholder="Search by keywords"
          @focus="isInputFocused = true"
          @blur="isInputFocused = false"
        />
        <button><Icon name="search" /></button>
      </div>
    </div>
  </div>
  <div class="wrapper">
    <div v-if="articles && articles.length > 0" class="cards">
      <Card v-for="article of articles" :key="article.id" :article />
    </div>
    <p v-else class="error">Something went wrong...</p>
  </div>
</template>

<script setup lang="ts">
import { Icon, Select } from "@components/partials";
import { Card } from "@/views/Home";

import { ref } from "vue";

import type { IOption } from "@/types";
import type { Article } from "@/types/interfaces/Article";

const isInputFocused = ref<boolean>(false);

const select = ref<IOption["value"] | null>(null);
const usersList = ref<IOption[]>([
  { name: "user1", value: 1 },
  { name: "user2", value: 2 },
  { name: "user3", value: 3 },
]);

const articles = ref<Article[] | null>(null);

fetch(import.meta.env.VITE_API_URL + "/posts?_limit=8")
  .then((res) => res.json())
  .then((json) => (articles.value = json))
  .catch((error) => console.log(error));
</script>

<style lang="scss" scoped>
@import "@styles/functions";

.root {
  width: 100%;
  padding: to-rem(40) to-rem(60);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: to-rem(40);

  .heading {
    align-content: center;

    height: 100%;

    font-size: to-rem(20);
    font-weight: 500;
    color: $color-logo;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .select,
  .search {
    width: to-rem(240);
    height: 100%;
  }

  .search {
    position: relative;

    display: flex;
    align-items: center;

    height: 100%;
    padding-left: to-rem(15);

    border: 1px solid $color-text-secondary;

    &.focused {
      border-color: $color-commented;
    }

    input {
      display: flex;
      align-items: center;

      width: 100%;
      height: 100%;

      background: transparent;
      border: none;
      caret-color: $color-text-secondary;

      &::placeholder {
        font-size: to-rem(14);
        font-weight: 500;
        text-transform: uppercase;
      }

      &:focus {
        outline: none;
      }
    }

    button {
      cursor: pointer;

      position: absolute;
      right: 0;

      display: flex;
      align-items: center;
      justify-content: center;

      width: to-rem(50);
      height: 100%;

      color: $color-text-secondary;

      border: none;
      border-left: 1px solid $color-text-secondary;

      & > * {
        width: 22px;
      }
    }
  }

  .select {
    &.active {
      :deep(.select__head) {
        font-weight: 400;
        color: $color-logo;
        text-transform: none;
        letter-spacing: normal;
      }
    }

    :deep(.select__head) {
      height: 100%;
      padding: 0;

      font-size: to-rem(14);
      font-weight: 300;
      color: $color-text-secondary;
      text-transform: uppercase;
      letter-spacing: 2px;

      border: none;
      border-radius: 0;
    }

    :deep(.head__title) {
      padding-left: to-rem(15);
    }

    :deep(.head__icon) {
      width: to-rem(50);
      border-left: 1px solid $color-bg;
    }

    :deep(.svg) {
      scale: 1.2;
    }

    :deep(.select__item) {
      color: $color-logo;
      border-color: $color-bg;
      border-radius: 0;
    }
  }
}

.wrapper {
  width: 100%;
  padding: to-rem(50);
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
