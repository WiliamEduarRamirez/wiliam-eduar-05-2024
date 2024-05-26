<script setup lang="ts">
import CustomContainer from '@/sections/shared/components/CustomContainer.vue';
</script>

<template>
  <footer class="bg-secondary text-white lg:px-4 py-8">
    <CustomContainer>
      <div class="text-center text-xs md:text-sm lg:text-base">
        <p>&copy; {{ new Date().getFullYear() }} Pokémon. Todos los derechos reservados.</p>
        <p>Wiliam Ramirez</p>
      </div>
    </CustomContainer>
  </footer>
</template>

<style scoped></style>
