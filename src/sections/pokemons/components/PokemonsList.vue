<script setup lang="ts">
import { onMounted, onUnmounted, ref, Ref } from 'vue';
import { ENV } from '@/shared/config/environment.ts';
import { Pokemon } from '@/modules/pokemons/domain/Pokemon.ts';
import { useTeamStore } from '@/sections/teams/stores/TeamStore.ts';
import { storeToRefs } from 'pinia';
import { usePokemons } from '@/sections/pokemons/composables/usePokemons.ts';
import { ArrowUpCircleIcon } from '@heroicons/vue/24/solid';
import CustomSpinner from '@/sections/shared/components/CustomSpinner.vue';
import PokemonListHeader from '@/sections/pokemons/components/PokemonListHeader.vue';
import PokemonDialog from '@/sections/pokemons/components/PokemonDialog.vue';
import PokemonGrid from '@/sections/pokemons/components/PokemonGrid.vue';

const { pokemons, isLoading, maxPokemonLimit } = usePokemons();
const teamStore = useTeamStore();
const { teamPokemons } = storeToRefs(teamStore);

const isDialogOpen: Ref<boolean> = ref(false);
const showScrollButton = ref(false);
const pokemonSelected = ref<Pokemon | null>(null);

function selectPokemon(pokemon: Pokemon) {
  const index = teamPokemons.value.findIndex(p => p.id === pokemon.id);
  pokemonSelected.value = pokemon;
  if (index === -1) {
    if (teamPokemons.value.length >= ENV.MAX_POKEMON_SELECTED) {
      openDialog();
      return;
    }
    teamStore.addPokemon(pokemon);
  } else {
    teamStore.removePokemon(pokemon);
  }
}

function closeDialog() {
  isDialogOpen.value = false;
}
function openDialog() {
  isDialogOpen.value = true;
}

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function handleScroll() {
  showScrollButton.value = window.scrollY > 100;
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <h1 class="text-center font-bold text-xl md:text-2xl lg:text-3xl text-primary mb-4">
    Arma tu equipo Pokémon
  </h1>
  <h2 class="mb-4 text-base md:text-xl lg:text-2xl text-gray-500 font-medium">
    Selecciona tus pokémons favoritos para armar tu equipo
  </h2>
  <PokemonListHeader :pokemons="pokemons" />
  <PokemonGrid :pokemons="pokemons" :team-pokemons="teamPokemons" @selectPokemon="selectPokemon" />
  <div v-if="isLoading" class="mt-6 flex items-center justify-center">
    <CustomSpinner color="primary" class="mr-3" />
    <p>Cargando...</p>
  </div>
  <div v-if="maxPokemonLimit" class="mt-6 flex items-center justify-center">
    <p class="text-red-500">Ya no hay más pokémons disponibles</p>
  </div>
  <button
    v-if="showScrollButton"
    @click="scrollTop"
    class="fixed right-3 bottom-24 bg-red-300 p-3 rounded-full"
  >
    <ArrowUpCircleIcon class="text-white w-10 h-10" />
  </button>
  <PokemonDialog
    :close-dialog="closeDialog"
    :is-dialog-open="isDialogOpen"
    :pokemon-selected="pokemonSelected"
  />
</template>

<style scoped></style>
