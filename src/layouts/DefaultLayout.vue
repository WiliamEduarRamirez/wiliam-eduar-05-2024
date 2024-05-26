<script setup lang="ts">
import CustomNavbar from '@/sections/shared/components/CustomNavbar.vue';
import CustomFooter from '@/sections/shared/components/CustomFooter.vue';
import CustomContainer from '@/sections/shared/components/CustomContainer.vue';
</script>

<template>
  <div>
    <CustomNavbar />
    <main class="bg-gray-100">
      <CustomContainer tag="div" class="pt-24 pb-8">
        <router-view />
      </CustomContainer>
    </main>
    <CustomFooter />
  </div>
</template>

<style scoped></style>
