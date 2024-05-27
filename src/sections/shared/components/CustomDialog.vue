<script setup lang="ts">
import { ref, onMounted, computed, watch, onUnmounted } from 'vue';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  shouldCloseOnOverlayClick?: boolean;
  showCloseButton?: boolean;
  width?: number;
  fullWidth?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

const props = defineProps<DialogProps>();

const dialogRef = ref<HTMLDivElement | null>(null);

const widthClass = computed(() => (props.width ? `w-[${props.width}px]` : ''));
const fullWidthClass = computed(() => (props.fullWidth ? 'w-full' : 'w-auto'));
const maxWidthClass = computed(() => {
  const classes = {
    sm: 'max-w-dialog-sm',
    md: 'max-w-dialog-md',
    lg: 'max-w-dialog-lg',
    xl: 'max-w-dialog-xl',
  };
  return props.maxWidth ? classes[props.maxWidth] : '';
});

const customStyle = computed(() => (props.width ? { width: `${props.width}px` } : {}));

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    props.onClose();
  }
};

const handleClickOutside = (event: MouseEvent) => {
  if (
    props.shouldCloseOnOverlayClick &&
    dialogRef.value &&
    !dialogRef.value.contains(event.target as Node)
  ) {
    props.onClose();
  }
};

watch(
  () => props.isOpen,
  isOpen => {
    if (isOpen) {
      document.body.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.body.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    }
  },
);

onMounted(() => {
  if (props.isOpen) {
    document.body.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);
  }
});

onUnmounted(() => {
  document.body.removeEventListener('keydown', handleEscape);
  document.removeEventListener('mousedown', handleClickOutside);
});
</script>
<template>
  <div
    v-if="isOpen"
    class="z-10 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 transition-opacity duration-300"
  >
    <div
      :class="[
        'bg-white rounded-lg shadow-lg p-6 relative transition-transform duration-300 transform scale-95',
        widthClass,
        fullWidthClass,
        maxWidthClass,
      ]"
      :style="customStyle"
      ref="dialogRef"
    >
      <span
        v-if="showCloseButton"
        class="absolute top-3 right-3 text-lg cursor-pointer"
        @click="onClose"
      >
        X
      </span>
      <slot />
    </div>
  </div>
</template>
<style scoped></style>
