<template>
  <div class="search" :class="{ focused: isInputFocused }">
    <input
      type="search"
      :placeholder="placeholder ? `${placeholder}` : ''"
      @focus="isInputFocused = true"
      @blur="isInputFocused = false"
      v-model="model"
      @keydown.enter.prevent="handleButton"
    />
    <button @click="handleButton"><Icon name="search" /></button>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@/components/partials";

import { ref, defineModel } from "vue";

defineProps({
  placeholder: String,
});

const emit = defineEmits(["search"]);

const model = defineModel({ required: true, type: String });

const isInputFocused = ref(false);

const handleButton = () => {
  emit("search", model);
};
</script>

<style lang="scss" scoped>
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
</style>
