<script setup lang="ts">
import { provide } from 'vue';
import { createApiPokemonRepository } from '@/modules/pokemons/infrastructure/ApiPokemonRepository.ts';
import PokemonsList from '@/sections/pokemons/components/PokemonsList.vue';
const pokemonRepository = createApiPokemonRepository();
provide('pokemonRepository', pokemonRepository);
</script>

<template>
  <div class="min-h-screen">
    <pokemons-list />
  </div>
</template>

<style scoped></style>
