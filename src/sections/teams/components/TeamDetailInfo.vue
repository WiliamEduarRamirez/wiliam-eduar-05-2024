<script setup lang="ts">
import { PokemonDetails } from '@/modules/pokemons/domain/PokemonDetails.ts';

defineProps<{
  teamPokemonDetails: PokemonDetails | null;
}>();
</script>

<template>
  <div class="flex justify-center items-center">
    <img
      :src="teamPokemonDetails?.pokemon.imageUrl"
      class="w-full lg:w-96 xl:w-3/4 h-auto aspect-auto bg-gray-100"
      alt="Pokemon"
    />
  </div>
  <div class="flex flex-col">
    <h3 class="text-gray-500 text-base lg:text-xl xl:text-2xl font-medium mb-2">
      {{ teamPokemonDetails?.description }}
    </h3>
    <h4 class="font-medium mb-2 text-primary text-base xl:text-xl">Sonido</h4>
    <div class="mb-2">
      <audio class="w-full xl:w-3/4" :src="teamPokemonDetails?.pokemon.sound" controls></audio>
    </div>
    <h4 class="font-medium mb-2 text-primary text-base xl:text-xl">Tipo</h4>
    <div class="grid grid-cols-3 gap-3 mb-2">
      <template v-for="type in teamPokemonDetails?.types">
        <span
          :style="{ background: type.color }"
          class="w-full text-center text-white px-2 py-1 rounded mr-2 font-semi-bold capitalize text-sm xl:text-base"
        >
          {{ type.name }}
        </span>
      </template>
    </div>
    <div class="flex">
      <div>
        <h4 class="font-medium text-primary text-base xl:text-xl">Altura</h4>
        <p class="mb-2 text-secondary text-base xl:text-xl">{{ teamPokemonDetails?.height }} m</p>
      </div>
      <div class="ml-4">
        <h4 class="font-medium text-primary text-base xl:text-xl">Peso</h4>
        <p class="mb-2 text-secondary text-base xl:text-xl">{{ teamPokemonDetails?.weight }} kg</p>
      </div>
    </div>
    <h4 class="font-medium mb-2 text-primary text-base xl:text-xl">Sexo</h4>
    <div class="flex" v-if="teamPokemonDetails">
      <div v-if="teamPokemonDetails.gender.none">
        <p class="mb-2 text-secondary text-base xl:text-xl">Sin género</p>
      </div>
      <div v-if="teamPokemonDetails.gender.male">
        <p class="mb-2 text-secondary text-base xl:text-xl">Macho</p>
      </div>
      <div class="ml-4" v-if="teamPokemonDetails.gender.female">
        <p class="mb-2 text-secondary text-base xl:text-xl">Hembra</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
