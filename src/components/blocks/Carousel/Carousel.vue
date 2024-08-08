<template>
  <div class="carousel">
    <slot :currentSlide />

    <!-- Navigation -->
    <div class="navigate" v-if="props.navigation">
      <div class="toggle-page left" @click="prevSlide">
        <Icon name="arrow" class="icon" />
      </div>
      <div class="toggle-page right" @click="nextSlide">
        <Icon name="arrow" class="icon" />
      </div>
    </div>

    <!-- Pagination -->
    <div class="pagination" v-if="pagination">
      <span
        class="circle"
        @click="goToSlide(index)"
        v-for="(_, index) in getSlideCount"
        :key="index"
        :class="{ active: index === currentSlide }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from "@/components/partials/Icon.vue";
import { ref, onMounted, defineProps } from "vue";

const props = defineProps({
  navigation: {
    type: Boolean,
    default: true,
  },
  timeoutDuration: {
    type: Number,
    default: 5000,
    validator: (value: number) => value >= 0 && value <= 10000,
  },
  autoPlay: {
    type: Boolean,
    default: true,
  },
  pagination: {
    type: Boolean,
    default: true,
  },
});

const currentSlide = ref(0);
const getSlideCount = ref<number | null>(null);
const autoPlayEnabled = ref(props.autoPlay);
const timeoutDuration = ref(props.timeoutDuration);

onMounted(() => {
  getSlideCount.value = document.querySelectorAll(".slide").length;
  console.log(getSlideCount.value);
});

const nextSlide = (): void => {
  if (getSlideCount.value && currentSlide.value === getSlideCount.value - 1) {
    currentSlide.value = 0;
    return;
  }
  currentSlide.value++;
};

const prevSlide = (): void => {
  if (currentSlide.value === 0 && getSlideCount.value) {
    currentSlide.value = getSlideCount.value - 1;
    return;
  }
  currentSlide.value--;
};

const goToSlide = (index: number): void => {
  currentSlide.value = index;
};

const autoPlay = () => {
  setInterval(() => {
    nextSlide();
  }, timeoutDuration.value);
};

if (autoPlayEnabled.value) {
  autoPlay();
}
</script>

<style lang="scss" scoped>
.navigate {
  position: absolute;
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  padding: 0 16px;

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 40px;
    height: 40px;

    color: white;

    background-color: #6347c7;
    border-radius: 50%;
  }

  .toggle-page {
    cursor: pointer;
    display: flex;
    flex: 1;

    &.left {
      justify-content: flex-start;

      .icon {
        transform: rotate(180deg);
      }
    }

    &.right {
      justify-content: flex-end;
    }
  }
}

.pagination {
  position: absolute;
  bottom: 24px;

  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;

  width: 100%;

  .circle {
    cursor: pointer;

    z-index: 1;

    width: 20px;
    height: 20px;

    background-color: #fff;
    border-radius: 50%;
    box-shadow:
      0 1px 3px 0 rgb(0 0 0 / 10%),
      0 1px 2px 0 rgb(0 0 0 / 6%);
  }

  .active {
    background-color: #6347c7;
  }
}
</style>
