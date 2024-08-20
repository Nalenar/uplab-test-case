<template>
  <div class="root">
    <Select class="select" :options v-model="parentSelectedOption" with-null-option placeholder="Categories" />
    <br />
    <h1>parentSelectedOption: {{ parentSelectedOption }}</h1>
    <Details color="white" />
  </div>
</template>

<script setup lang="ts">
import Select from "@/components/partials/Select.vue";
import Details from "@/components/partials/Details.vue";
import { type IOption } from "@/types";

import { ref } from "vue";

const options = ref<IOption[]>([
  {
    name: "user1",
    value: 1,
  },
  {
    name: "user2",
    value: 2,
  },
  {
    name: "user3",
    value: 3,
  },
]);

const parentSelectedOption = ref<IOption["value"]>(null);
</script>

<style lang="scss" scoped>
.root {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
}
</style>
