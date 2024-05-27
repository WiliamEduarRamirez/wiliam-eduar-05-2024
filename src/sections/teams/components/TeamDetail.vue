<script setup lang="ts">
import { useTeamStore } from '@/sections/teams/stores/TeamStore.ts';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref, Ref } from 'vue';
import CustomSpinner from '@/sections/shared/components/CustomSpinner.vue';
import axios, { AxiosError } from 'axios';
import CustomButton from '@/sections/shared/components/CustomButton.vue';
import TeamDetailEvolutions from '@/sections/teams/components/TeamDetailEvolutions.vue';
import TeamDetailStats from '@/sections/teams/components/TeamDetailStats.vue';
import TeamDetailInfo from '@/sections/teams/components/TeamDetailInfo.vue';

const route = useRoute();
const router = useRouter();
const teamStore = useTeamStore();
const { teamPokemonDetails } = storeToRefs(teamStore);

const isLoading: Ref<boolean> = ref(true);
const existError: Ref<boolean> = ref(false);
const error: Ref<string | null> = ref(null);

onMounted(() => {
  const pokemonId = Number(route.params.id as string);
  isLoading.value = true;
  existError.value = false;
  teamStore
    .loadTeamPokemonDetail(pokemonId)
    .catch(err => {
      existError.value = true;
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;
        if (axiosError.response?.status === 404) {
          error.value = 'Ups! No disponemos de información de este Pokémon';
        }
      }
    })
    .finally(() => {
      isLoading.value = false;
    });
});
</script>

<template>
  <div v-if="isLoading" class="mt-16 flex flex-col items-center justify-center">
    <CustomSpinner color="primary" />
    <p class="text-primary text-xl font-semi-bold">Cargando...</p>
  </div>
  <div v-if="existError" class="mt-16 flex flex-col items-center justify-center">
    <p class="text-primary text-3xl font-semi-bold">Ha ocurrido un error</p>
    <p class="text-secondary text-2xl font-medium">{{ error }}</p>
    <CustomButton @click="() => router.push('/team')" color="secondary" class="mt-4">
      <template #default>Regresar</template>
    </CustomButton>
  </div>
  <div
    v-show="!isLoading && !existError"
    class="grid grid-cols-1 lg:grid-cols-2 bg-white shadow-none md:shadow-md rounded-none md:rounded-lg p-0 md:p-6 xl:p-10 gap-6"
  >
    <h1
      class="mb-4 text-center col-span-1 lg:col-span-2 text-primary text-3xl xl:text-4xl font-semi-bold capitalize"
    >
      {{ teamPokemonDetails?.pokemon.name }}
    </h1>
    <TeamDetailInfo :team-pokemon-details="teamPokemonDetails" />
    <TeamDetailStats :team-pokemon-details="teamPokemonDetails" />
    <TeamDetailEvolutions v-if="teamPokemonDetails" :team-pokemon-details="teamPokemonDetails" />
  </div>
</template>

<style scoped></style>
