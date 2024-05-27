<script setup lang="ts">
import { useTeamStore } from '@/sections/teams/stores/TeamStore.ts';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref, Ref, watch } from 'vue';
import Chart from 'chart.js/auto';
import { ChevronDownIcon } from '@heroicons/vue/24/solid';
import CustomSpinner from '@/sections/shared/components/CustomSpinner.vue';
import axios, { AxiosError } from 'axios';
import CustomButton from '@/sections/shared/components/CustomButton.vue';

const route = useRoute();
const router = useRouter();
const teamStore = useTeamStore();
const { teamPokemonDetails } = storeToRefs(teamStore);

const isLoading: Ref<boolean> = ref(true);
const existError: Ref<boolean> = ref(false);
const error: Ref<string | null> = ref(null);
const statsChart = ref<HTMLCanvasElement | null>(null);

function setupChart() {
  if (!statsChart.value) return;
  if (!teamPokemonDetails.value) return;
  const ctx = statsChart.value.getContext('2d');
  if (!ctx) return;
  const labels = ['HP', 'Ataque', 'Defensa', 'Ataque especial', 'Defensa especial', 'Velocidad'];
  const pokemon = teamPokemonDetails.value.pokemon;
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'My First Dataset',
        data: [
          pokemon.stats.hp,
          pokemon.stats.attack,
          pokemon.stats.defense,
          pokemon.stats.specialAttack,
          pokemon.stats.specialDefense,
          pokemon.stats.speed,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)', // HP
          'rgba(54, 162, 235, 0.2)', // Ataque
          'rgba(255, 206, 86, 0.2)', // Defensa
          'rgba(75, 192, 192, 0.2)', // Ataque especial
          'rgba(153, 102, 255, 0.2)', // Defensa especial
          'rgba(255, 159, 64, 0.2)', // Velocidad
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)', // HP
          'rgba(54, 162, 235, 1)', // Ataque
          'rgba(255, 206, 86, 1)', // Defensa
          'rgba(75, 192, 192, 1)', // Ataque especial
          'rgba(153, 102, 255, 1)', // Defensa especial
          'rgba(255, 159, 64, 1)', // Velocidad
        ],
        borderWidth: 1,
      },
    ],
  };
  new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
}

/*Created*/

/*if (!teamPokemonDetails.value && route.params.id) {
  isLoading.value = true;
  const pokemonId = Number(route.params.id as string);

  teamStore.loadTeamPokemonDetail(pokemonId).finally(() => {
    isLoading.value = false;
  });
}

if (teamPokemonDetails.value && route.params.id) {
  const pokemonId = Number(route.params.id as string);
  if (pokemonId !== teamPokemonDetails.value.pokemon.id) {
    isLoading.value = true;
    teamStore.loadTeamPokemonDetail(pokemonId).finally(() => {
      isLoading.value = false;
    });
  }
}*/

/*Created*/

watch(
  teamPokemonDetails,
  () => {
    setupChart();
  },
  { immediate: true },
);

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
  // setupChart();
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
    class="grid grid-cols-1 lg:grid-cols-2 bg-white shadow-none md:shadow-md rounded-none md:rounded-lg p-0 md:p-6 gap-6"
  >
    <h1
      class="mb-4 text-center col-span-1 lg:col-span-2 text-primary text-3xl xl:text-4xl font-semi-bold capitalize"
    >
      {{ teamPokemonDetails?.pokemon.name }}
    </h1>
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
          <p class="mb-2 text-secondary text-base xl:text-xl">
            {{ teamPokemonDetails?.weight }} kg
          </p>
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
    <h2
      class="text-center col-span-1 lg:col-span-2 text-primary text-2xl xl:text-3xl font-semi-bold capitalize"
    >
      Estadísticas
    </h2>
    <div class="col-span-1 lg:col-span-2 flex justify-center items-center">
      <div class="w-full px-0 md:px-5 xl:w-3/4">
        <canvas class="w-full h-full" ref="statsChart"></canvas>
      </div>
    </div>
    <h2
      class="text-center col-span-1 lg:col-span-2 text-primary text-2xl xl:text-3xl font-semi-bold capitalize"
    >
      Cadena evolutiva
    </h2>
    <div
      v-if="teamPokemonDetails"
      class="col-span-1 lg:col-span-2 flex flex-col lg:flex-row items-center justify-center"
    >
      <template v-for="(evolution, index) in teamPokemonDetails.evolutions">
        <div class="flex flex-col items-center">
          <img
            :src="evolution.image"
            class="w-52 md:w-48 xl:w-60 h-auto aspect-auto bg-gray-100"
            alt="Pokemon"
          />
          <p class="text-center text-secondary capitalize mt-2 font-semi-bold text-xl xl:text-2xl">
            {{ evolution.name }}
          </p>
        </div>
        <ChevronDownIcon
          v-if="index < teamPokemonDetails.evolutions.length - 1"
          class="w-14 h-14 my-4 mx-5 text-primary transform lg:rotate-270"
        />
      </template>
    </div>
  </div>
</template>

<style scoped></style>
