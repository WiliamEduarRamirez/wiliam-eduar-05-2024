<script setup lang="ts">
import TeamDetail from '@/sections/teams/components/TeamDetail.vue';
import { createApiPokemonRepository } from '@/modules/pokemons/infrastructure/ApiPokemonRepository.ts';
import { provide } from 'vue';

const pokemonRepository = createApiPokemonRepository();
provide('pokemonRepository', pokemonRepository);
</script>

<template>
  <div class="min-h-screen">
    <TeamDetail />
  </div>
</template>

<style scoped></style>
