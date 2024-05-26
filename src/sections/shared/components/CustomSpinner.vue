<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  color?: 'primary' | 'secondary' | 'tertiary';
}>();

const colorClass = computed(() => {
  switch (props.color) {
    case 'primary':
      return 'border-primary';
    case 'secondary':
      return 'border-secondary';
    case 'tertiary':
      return 'border-tertiary';
    default:
      return 'border-primary';
  }
});
</script>

<template>
  <div class="flex items-center justify-center">
    <div
      class="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2"
      :class="colorClass"
    ></div>
  </div>
</template>

<style scoped></style>
