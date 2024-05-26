<script setup lang="ts">
import { Pokemon } from '@/modules/pokemons/domain/Pokemon.ts';
import { onMounted, ref } from 'vue';
import Chart from 'chart.js/auto';

// Definición de propiedades del componente
const props = defineProps<{
  pokemon: Pokemon;
  removeFromTeam: () => void;
}>();

const statsChart = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  if (statsChart.value) {
    const ctx = statsChart.value.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'radar',
        data: {
          labels: ['HP', 'Ataque', 'Defensa', 'Ataque especial', 'Defensa especial', 'Velocidad'],
          datasets: [
            {
              label: 'Estadística',
              data: [
                props.pokemon.stats.hp,
                props.pokemon.stats.attack,
                props.pokemon.stats.defense,
                props.pokemon.stats.specialAttack,
                props.pokemon.stats.specialDefense,
                props.pokemon.stats.speed,
              ],
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            r: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }
});

/*onMounted(() => {
  if (statsChart.value) {
    const ctx = statsChart.value.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'radar',
        data: {
          labels: ['HP', 'Ataque', 'Defensa', 'Ataque especial', 'Defensa especial', 'Velocidad'],
          datasets: [
            {
              label: 'Estadística',
              data: [
                props.pokemon.stats.hp,
                props.pokemon.stats.attack,
                props.pokemon.stats.defense,
                props.pokemon.stats.specialAttack,
                props.pokemon.stats.specialDefense,
                props.pokemon.stats.speed,
              ],
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            r: {
              beginAtZero: true,
              pointLabels: {
                font: {
                  size: 14,
                },
              },
              ticks: {
                showLabelBackdrop: false,
                backdropPadding: {
                  top: 10,
                  bottom: 10,
                },
                z: 1,
                stepSize: 10,
              },
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }
});*/
</script>

<template>
  <div class="max-w-sm md:max-w-sm lg:max-w-md bg-white shadow-md rounded-lg p-4 mb-4">
    <h3 class="text-xl md:text-2xl font-bold my-2 capitalize text-secondary text-center">
      {{ pokemon.name }}
    </h3>

    <img
      :src="pokemon.imageUrl"
      :alt="pokemon.name"
      class="mx-auto w-full md:w-52 lg:w-56 object-contain"
    />
    <h4 class="font-medium mb-2 text-primary">Tipo</h4>
    <div class="flex mb-2">
      <template v-for="type in pokemon.types">
        <span
          :style="{ background: type.color }"
          class="text-white text-sm px-2 py-1 rounded mr-2 capitalize"
        >
          {{ type.name }}
        </span>
      </template>
    </div>
    <h4 class="font-medium mb-2 text-primary">Estadísticas</h4>
    <div class="mb-4">
      <canvas class="w-full h-full" ref="statsChart"></canvas>
    </div>
    <h4 class="font-medium mb-2 text-primary">Sonido</h4>
    <div class="mb-4">
      <audio class="w-full" :src="pokemon.sound" controls></audio>
    </div>
    <button @click="removeFromTeam" class="bg-red-500 text-white px-4 py-2 rounded">
      Eliminar del equipo
    </button>
    <router-link :to="`/team/${pokemon.id}`" class="text-blue-500 hover:underline">
      Ver detalles
    </router-link>
  </div>
</template>

<style scoped></style>
