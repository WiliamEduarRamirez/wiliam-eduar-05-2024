<script setup lang="ts">
import { Pokemon } from '@/modules/pokemons/domain/Pokemon.ts';

// props
defineProps<{
  pokemon: Pokemon;
  isSelected?: boolean;
}>();
</script>

<template>
  <div
    class="cursor-pointer max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:translate-y-2"
    :class="{ 'border-2 border-tertiary': isSelected }"
  >
    <img :src="pokemon.imageUrl" :alt="pokemon.name" class="w-full lg:w-52 h-48 object-cover" />
    <div class="p-4">
      <h3 class="text-gray-900 font-semi-bold text-xl capitalize">{{ pokemon.name }}</h3>
      <div class="mt-4">
        <span class="inline-block bg-primary text-white text-sm font-semi-bold px-2 py-1 rounded">
          #{{ pokemon.id }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
