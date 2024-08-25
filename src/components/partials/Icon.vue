<script setup lang="ts">
import { defineAsyncComponent, type PropType } from "vue";
import type { TIcon } from "@/types";

const props = defineProps({
  name: { type: String as PropType<TIcon>, required: true },
});

const icon = defineAsyncComponent(() => import(`@icons/${props.name}.svg`));
</script>

<template>
  <component :is="icon" />
</template>
