<template>
  <footer class="bg-secondary text-white p-4">
    <Container>
      <div class="text-center">
        <p>&copy; 2024 Pokémon. All rights reserved.</p>
        <ul class="flex justify-center space-x-4 mt-2">
          <li><a href="/about" class="hover:text-tertiary">About</a></li>
          <li><a href="/contact" class="hover:text-tertiary">Contact</a></li>
          <li><a href="/privacy" class="hover:text-tertiary">Privacy Policy</a></li>
        </ul>
      </div>
    </Container>
  </footer>
</template>

<script setup lang="ts">
import Container from '@/sections/shared/components/CustomContainer.vue';
</script>

<style scoped></style>
