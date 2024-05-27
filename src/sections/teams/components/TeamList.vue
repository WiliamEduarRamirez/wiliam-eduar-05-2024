<script setup lang="ts">
import { useTeamStore } from '@/sections/teams/stores/TeamStore.ts';
import { storeToRefs } from 'pinia';
import TeamCard from '@/sections/teams/components/TeamCard.vue';
import { computed } from 'vue';
import CustomButton from '@/sections/shared/components/CustomButton.vue';
import { useRouter } from 'vue-router';
import { ENV } from '@/shared/config/environment.ts';

const router = useRouter();
const teamStore = useTeamStore();
const { teamPokemons } = storeToRefs(teamStore);

const totalPokemons = computed(() => teamPokemons.value.length);
const pokemonsNames = computed(() => teamPokemons.value.map(pokemon => pokemon.name).join(', '));
</script>

<template>
  <h1 class="font-bold text-primary text-xl md:text-2xl lg:text-3xl mb-4">
    Tu equipo esta compuesto por {{ totalPokemons }} pokemones
  </h1>
  <template v-if="totalPokemons === 0">
    <p class="text-gray-500 text-lg md:text-xl lg:text-2xl">Aun no tienes pokemones en tu equipo</p>
    <CustomButton @click="() => router.push('/')" class="my-4">
      <template #default> Agregar pokemones </template>
    </CustomButton>
  </template>
  <template v-if="totalPokemons !== 0">
    <h2 class="text-gray-500 font-medium text-lg md:text-xl lg:text-2xl my-4 capitalize">
      {{ pokemonsNames }}
    </h2>
    <template v-if="totalPokemons !== ENV.MAX_POKEMON_SELECTED">
      <CustomButton @click="() => router.push('/')" class="mb-4">
        <template #default> Agregar mas pokemones </template>
      </CustomButton>
    </template>
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 place-items-center">
      <template v-for="pokemon in teamPokemons">
        <TeamCard :pokemon="pokemon" :remove-from-team="() => teamStore.removePokemon(pokemon)" />
      </template>
    </div>
  </template>
</template>

<style scoped></style>
