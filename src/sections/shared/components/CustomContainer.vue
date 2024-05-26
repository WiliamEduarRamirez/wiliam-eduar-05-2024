<script setup lang="ts">
import { computed } from 'vue';

type ContainerTag = 'div' | 'section' | 'main' | 'article' | 'aside' | 'nav' | 'header' | 'footer';

const props = defineProps<{
  tag?: ContainerTag;
}>();

const Tag = computed(() => props.tag || 'section');
</script>

<template>
  <component
    :is="Tag"
    class="container mx-auto px-spacing-sm-x md:px-spacing-md-x lg:px-spacing-lg-x xl:px-spacing-xl-x"
  >
    <slot />
  </component>
</template>

<style scoped></style>
