<script setup lang="ts">
import { defineAsyncComponent, type PropType } from "vue";

type IconType = "heart" | "comments" | "docs";

const props = defineProps({
  name: { type: String as PropType<IconType>, required: true },
});

const icon = defineAsyncComponent(() => import(`@icons/${props.name}.svg`));
</script>

<template>
  <component :is="icon" />
</template>
