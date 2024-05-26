<script setup lang="ts">
import { useTeamStore } from '@/sections/teams/stores/TeamStore.ts';
import { storeToRefs } from 'pinia';
import TeamCard from '@/sections/teams/components/TeamCard.vue';
import { computed } from 'vue';

const teamStore = useTeamStore();
const { teamPokemons } = storeToRefs(teamStore);

const totalPokemons = computed(() => teamPokemons.value.length);
const pokemonsNames = computed(() => teamPokemons.value.map(pokemon => pokemon.name).join(', '));
</script>

<template>
  <h1 class="font-bold text-primary text-xl lg:text-2xl md:text-3xl my-4">
    Tu equipo esta compuesto por {{ totalPokemons }} pokemones
  </h1>
  <h2 class="text-gray-500 font-medium text-lg lg:text-xl md:text-2xl my-4 capitalize">
    {{ pokemonsNames }}
  </h2>
  <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
    <template v-for="pokemon in teamPokemons">
      <TeamCard :pokemon="pokemon" :remove-from-team="() => teamStore.removePokemon(pokemon)" />
    </template>
  </div>
</template>

<style scoped></style>
