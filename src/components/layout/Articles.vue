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
    <div class="cards">
      <Card :card />
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from "@components/partials/Icon.vue";
import Select from "@components/partials/Select.vue";
import Card from "@components/partials/Card.vue";

import { reactive, ref } from "vue";

import type { IOption } from "@/types";

const isInputFocused = ref<boolean>(false);

const select = ref<IOption["value"] | null>(null);
const usersList = ref<IOption[]>([
  { name: "user1", value: 1 },
  { name: "user2", value: 2 },
  { name: "user3", value: 3 },
]);
const card = reactive({
  date: "17 july 2024",
  image: "/images/main1.jpg",
  title: "Long time journey",
  text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. A velit quod nesciunt accusantium ut numquam, voluptatem vitae doloribus iure consectetur saepe, distinctio dolorum magni eos nulla dignissimos fuga rem molestias!",
});
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

.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: to-rem(40);

  width: 100%;
  margin-top: to-rem(50);
}
</style>
