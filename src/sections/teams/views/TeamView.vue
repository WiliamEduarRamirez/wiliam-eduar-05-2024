<script setup lang="ts">
import TeamList from '@/sections/teams/components/TeamList.vue';
import { createApiPokemonRepository } from '@/modules/pokemons/infrastructure/ApiPokemonRepository.ts';
import { provide } from 'vue';

const pokemonRepository = createApiPokemonRepository();
provide('pokemonRepository', pokemonRepository);
</script>

<template>
  <div class="min-h-screen">
    <TeamList />
  </div>
</template>

<style scoped></style>
