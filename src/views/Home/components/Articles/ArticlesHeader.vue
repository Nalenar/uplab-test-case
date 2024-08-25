<template>
  <div class="header">
    <Select
      v-if="isWithFilters"
      class="select"
      :class="{ active: select !== null }"
      :options="usersList"
      with-null-option
      placeholder="Choose user"
      v-model="filters.select"
    />
    <p class="heading" :class="{ centered: !isWithFilters }">{{ title }}</p>
    <Search
      v-if="isWithFilters"
      class="search"
      @search="handleSearch"
      v-model="filters.search"
      placeholder="Search by keywords"
    />
  </div>
</template>

<script setup lang="ts">
import { Select } from "@/components/partials";
import { Search } from "@/components/blocks";

import { ref, defineModel, watch, reactive } from "vue";

import type { IOption } from "@/types";
import type User from "@/types/interfaces/User";
import type { TModel as TSelectModel } from "@/types/interfaces/Select";

defineProps({
  isWithFilters: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["search"]);

const selectModel = defineModel<TSelectModel>("select", { required: true });
const searchModel = defineModel<string | null>("search", { required: true });

const filters = reactive<{ select: IOption["value"]; search: string }>({
  select: null,
  search: "",
});

const usersList = ref<IOption[]>([]);

const handleSearch = () => {
  emit("search", filters.search);
};

watch(
  () => filters.select,
  () => (selectModel.value = filters.select),
);
watch(
  () => filters.search,
  () => (searchModel.value = filters.search),
);

fetch(import.meta.env.VITE_API_URL + "/users")
  .then((res) => res.json())
  .then((json: User[]) => (usersList.value = json.map((user) => ({ name: user.name, value: user.id }))));
</script>

<style lang="scss" scoped>
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

    &.centered {
      width: 100%;
    }
  }

  .select,
  .search {
    width: to-rem(240);
    height: 100%;
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
</style>
