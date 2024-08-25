<template>
  <div class="select" ref="select">
    <div class="select__head" @click="isOpened = !isOpened">
      <p class="head__title">{{ getOptionOrPlaceholder }}</p>
      <span class="head__icon">
        <Icon class="svg" :name="props.icon ? props.icon : `arrow`" :class="{ active: isOpened }" />
      </span>
    </div>
    <Transition name="slide-fade">
      <div class="select__body" v-if="isOpened">
        <div class="select__item" v-for="(option, index) in options" :key="index" @click="handleSelect(option)">
          {{ option.name }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@components/partials";

import { computed, ref, onMounted, onBeforeUnmount } from "vue";

import type { IOption } from "@/types";
import type SelectProps from "@/types/interfaces/Select";
import type { TModel } from "@/types/interfaces/Select";

const props = defineProps<SelectProps>();
const model = defineModel<TModel>({ required: true });

const select = ref<HTMLDivElement | null>(null);
const isOpened = ref<boolean>(false);
const selectedOption = ref<IOption | null>(null);

const options = computed(() => {
  return props.withNullOption ? [{ name: "--- Reset ---", value: null }, ...props.options] : props.options;
});

const getOptionOrPlaceholder = computed((): string => {
  let result = "...";
  if (selectedOption.value && selectedOption.value.value) result = selectedOption.value.name;
  else if (props.placeholder) result = props.placeholder;
  return result;
});

const handleSelect = (option: IOption) => {
  selectedOption.value = option;
  model.value = option.value;
  isOpened.value = false;
};

const closeSelect = (element: any) => {
  if (!select.value?.contains(element.target)) isOpened.value = false;
};

onMounted(() => {
  window.addEventListener("click", closeSelect);
});

onBeforeUnmount(() => {
  window.removeEventListener("click", closeSelect);
});
</script>

<style lang="scss" scoped>
/* stylelint-disable selector-class-pattern */

.select {
  cursor: pointer;
  position: relative;
  width: 100%;

  &__head {
    display: flex;
    align-items: center;

    padding: to-rem(10) to-rem(15);

    background: $color-white;
    border: 1px solid #313131;
    border-radius: to-rem(8);

    .head__icon {
      display: flex;
      align-items: center;
      justify-content: center;

      height: 100%;
      margin-left: auto;

      & > * {
        transform: rotate(90deg);
        transition: transform 0.3s ease-out;

        &.active {
          transform: rotate(270deg);
        }
      }
    }
  }

  &__body {
    position: absolute;
    z-index: 2;

    overflow: hidden auto;

    width: 100%;
    max-height: to-rem(200);
    margin: to-rem(4) 0;
  }

  &__item {
    $radius: to-rem(8);

    padding: to-rem(10) to-rem(15);
    background: $color-white;
    border: 1px solid $color-border;
    border-bottom: none;

    &:hover {
      background-color: $color-bg;
    }

    &:first-of-type {
      border-top-left-radius: $radius;
      border-top-right-radius: $radius;
    }

    &:last-of-type {
      border-bottom: 1px solid $color-border;
      border-bottom-right-radius: $radius;
      border-bottom-left-radius: $radius;
    }
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-4px);
  opacity: 0;
}
</style>
