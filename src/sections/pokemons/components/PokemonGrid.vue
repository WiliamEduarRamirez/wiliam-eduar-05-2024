<script setup lang="ts">
import { defineEmits } from 'vue';
import PokemonCard from './PokemonCard.vue';
import { Pokemon } from '@/modules/pokemons/domain/Pokemon.ts';

const props = defineProps<{
  pokemons: Pokemon[];
  teamPokemons: Pokemon[];
}>();

const emits = defineEmits(['selectPokemon']);

function isSelected(pokemon: Pokemon) {
  return props.teamPokemons.some(p => p.id === pokemon.id);
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 xl:gap-x-6 gap-y-6">
    <template v-for="pokemon in pokemons" :key="pokemon.id">
      <PokemonCard
        :pokemon="pokemon"
        :is-selected="isSelected(pokemon)"
        @click="() => emits('selectPokemon', pokemon)"
      />
    </template>
  </div>
</template>

<style scoped></style>
