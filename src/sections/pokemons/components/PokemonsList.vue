<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue';
import { ENV } from '@/shared/config/environment.ts';
import { Pokemon } from '@/modules/pokemons/domain/Pokemon.ts';
import { useTeamStore } from '@/sections/teams/stores/TeamStore.ts';
import { storeToRefs } from 'pinia';
import { usePokemons } from '@/sections/pokemons/composables/usePokemons.ts';
import PokemonCard from '@/sections/pokemons/components/PokemonCard.vue';
import CustomDialog from '@/sections/shared/components/CustomDialog.vue';
import CustomButton from '@/sections/shared/components/CustomButton.vue';
import {
  CheckCircleIcon,
  ArrowRightStartOnRectangleIcon,
  ArrowUpCircleIcon,
} from '@heroicons/vue/24/solid';
import { useRouter } from 'vue-router';
import CustomSpinner from '@/sections/shared/components/CustomSpinner.vue';

const router = useRouter();
const { pokemons, isLoading } = usePokemons();
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

function goToTeam() {
  router.push('/team');
  closeDialog();
}

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function handleScroll() {
  showScrollButton.value = window.scrollY > 100;
}

function removeAndReplacePokemon(pokemon: Pokemon) {
  if (!pokemonSelected.value) return;
  teamStore.removePokemon(pokemon);
  teamStore.addPokemon(pokemonSelected.value);
  closeDialog();
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
});
</script>

<template>
  <h1 class="text-center font-bold text-xl md:text-2xl lg:text-3xl text-primary mb-4">
    Arma tu equipo Pokémon
  </h1>
  <h2 class="mb-4 text-base md:text-xl lg:text-2xl text-gray-500 font-medium">
    Selecciona tus pokémons favoritos para armar tu equipo
  </h2>
  <div class="mb-4 w-full flex flex-col md:flex-row items-center justify-between">
    <h3 class="text-secondary font-medium text-base mb-2 md:mb-0">
      Pokémons disponibles: {{ pokemons.length }}
    </h3>
    <CustomButton @click="() => router.push('/team')" color="secondary">
      <template #default>Ver Equipo</template>
      <template #endIcon>
        <ArrowRightStartOnRectangleIcon />
      </template>
    </CustomButton>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 xl:gap-x-6 gap-y-6">
    <template v-for="pokemon in pokemons" :key="pokemon.id">
      <pokemon-card
        :pokemon="pokemon"
        :is-selected="teamPokemons.some(p => p.id === pokemon.id)"
        @click="() => selectPokemon(pokemon)"
      />
    </template>
  </div>
  <div v-if="isLoading" class="mt-6 flex items-center justify-center">
    <CustomSpinner color="primary" class="mr-3" />
    <p>Cargando...</p>
  </div>
  <button
    v-if="showScrollButton"
    @click="scrollTop"
    class="fixed right-3 bottom-24 bg-red-300 p-3 rounded-full"
  >
    <ArrowUpCircleIcon class="text-white w-10 h-10" />
  </button>
  <CustomDialog
    :on-close="closeDialog"
    :is-open="isDialogOpen"
    :should-close-on-overlay-click="true"
  >
    <div class="">
      <h3 class="text-primary text-xl font-semi-bold">
        ¡Ups! No puedes seleccionar más de 6 pokémons
      </h3>
      <h4 class="text-secondary font-medium my-3">
        Tu equipo ya esta conformado por los siguientes pokémons:
      </h4>
      <ul>
        <li
          v-for="pokemon in teamPokemons"
          :key="pokemon.id"
          class="flex items-center space-x-2 py-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-primary"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.21.27-2.36.76-3.39l1.4 1.4c-.29.79-.46 1.64-.46 2.49 0 3.31 2.69 6 6 6 .85 0 1.7-.17 2.49-.46l1.4 1.4c-1.03.49-2.18.76-3.39.76zm6.24-2.41l-1.4-1.4c.29-.79.46-1.64.46-2.49 0-3.31-2.69-6-6-6-.85 0-1.7.17-2.49.46l-1.4-1.4C9.64 6.27 10.79 6 12 6c4.41 0 8 3.59 8 8 0 1.21-.27 2.36-.76 3.39zM12 8c-.83 0-1.5.67-1.5 1.5S11.17 11 12 11s1.5-.67 1.5-1.5S12.83 8 12 8z"
            />
          </svg>
          <span class="text-gray-500 font-light capitalize">{{ pokemon.name }}</span>
          <a
            @click="() => removeAndReplacePokemon(pokemon)"
            class="text-primary font-medium cursor-pointer hover:text-tertiary text-xs"
          >
            Remover y reemplazar
          </a>
        </li>
      </ul>
      <div class="w-full text-center mt-4">
        <CustomButton @click="closeDialog" color="secondary">
          <template #default>Entendido</template>
          <template #endIcon>
            <CheckCircleIcon />
          </template>
        </CustomButton>

        <CustomButton class="ml-3" @click="goToTeam">
          <template #default>Ver Equipo</template>
          <template #endIcon>
            <ArrowRightStartOnRectangleIcon />
          </template>
        </CustomButton>
      </div>
    </div>
  </CustomDialog>
</template>

<style scoped></style>
