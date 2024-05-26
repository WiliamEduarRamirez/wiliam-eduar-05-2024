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
    class="p-4 cursor-pointer grid grid-cols-1 xl:grid-cols-2 gap-4 place-items-center bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:translate-y-2"
    :class="{ 'border-2 border-tertiary': isSelected }"
  >
    <img
      :src="pokemon.imageUrl"
      :alt="pokemon.name"
      class="w-full sm:w-52 md:w-40 h-full object-contain aspect-square"
    />
    <div class="w-full">
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
