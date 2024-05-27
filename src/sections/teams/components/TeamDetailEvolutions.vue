<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/24/solid';
import { PokemonDetails } from '@/modules/pokemons/domain/PokemonDetails.ts';

defineProps<{
  teamPokemonDetails: PokemonDetails;
}>();
</script>

<template>
  <h2
    class="text-center col-span-1 lg:col-span-2 text-primary text-2xl xl:text-3xl font-semi-bold capitalize"
  >
    Cadena evolutiva
  </h2>
  <div class="col-span-1 lg:col-span-2 flex flex-col lg:flex-row items-center justify-center">
    <template v-for="(evolution, index) in teamPokemonDetails.evolutions">
      <div class="flex flex-col items-center">
        <img
          :src="evolution.image"
          class="w-52 md:w-48 xl:w-60 h-auto aspect-auto bg-gray-100"
          alt="Pokemon"
        />
        <p class="text-center text-secondary capitalize mt-2 font-semi-bold text-xl xl:text-2xl">
          {{ evolution.name }}
        </p>
      </div>
      <ChevronDownIcon
        v-if="index < teamPokemonDetails.evolutions.length - 1"
        class="w-14 h-14 my-4 mx-5 text-primary transform lg:rotate-270"
      />
    </template>
  </div>
</template>

<style scoped></style>
