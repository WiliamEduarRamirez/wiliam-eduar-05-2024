<template>
  <button
    :class="[
      'inline-flex justify-center items-center font-medium rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-150 ease-in-out h-fit',
      fullWidth ? 'w-full' : '',
      colorClasses,
      sizeClasses,
      props.disabled || props.loading ? 'bg-gray-400 text-gray-200 cursor-not-allowed' : '',
      props.class,
    ]"
    :disabled="props.disabled || props.loading"
  >
    <span :class="['flex-1 flex items-center justify-center', props.loading ? 'invisible' : '']">
      <span
        v-if="$slots.startIcon"
        :class="['flex items-center', startIconClasses, sizeIconClasses]"
      >
        <slot name="startIcon"></slot>
      </span>
      <slot></slot>
      <span v-if="$slots.endIcon" :class="['flex items-center', endIconClasses, sizeIconClasses]">
        <slot name="endIcon"></slot>
      </span>
    </span>
    <span v-if="props.loading" class="absolute flex items-center justify-center">
      <div :class="['animate-spin rounded-full border-b-2 border-white', sizeSpinnerClasses]"></div>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface ButtonProps {
  color?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  class?: string;
}

const props = defineProps<ButtonProps>();

const colorClasses = computed(() => {
  switch (props.color) {
    case 'secondary':
      return 'bg-secondary-500 hover:bg-secondary-600 active:bg-secondary-700 focus:ring-secondary-500 text-white';
    case 'tertiary':
      return 'bg-tertiary-500 hover:bg-tertiary-600 active:bg-tertiary-700 focus:ring-tertiary-500 text-white';
    case 'primary':
    default:
      return 'bg-primary-500 hover:bg-primary-600 active:bg-primary-700 focus:ring-primary-500 text-white';
  }
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'small':
      return 'py-1 px-3 text-sm';
    case 'large':
      return 'py-3 px-5 text-lg';
    case 'medium':
    default:
      return 'py-2 px-4 text-base';
  }
});

const sizeIconClasses = computed(() => {
  switch (props.size) {
    case 'small':
      return 'h-4 w-4';
    case 'large':
      return 'h-6 w-6';
    case 'medium':
    default:
      return 'h-5 w-5';
  }
});

const sizeSpinnerClasses = computed(() => {
  switch (props.size) {
    case 'small':
      return 'h-4 w-4';
    case 'large':
      return 'h-6 w-6';
    case 'medium':
    default:
      return 'h-5 w-5';
  }
});

const startIconClasses = 'mr-2';
const endIconClasses = 'ml-2';
</script>

<style scoped>
/* No additional CSS needed as Tailwind CSS classes are used for styling */
</style>
