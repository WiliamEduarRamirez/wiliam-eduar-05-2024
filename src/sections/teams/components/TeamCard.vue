<script setup lang="ts">
import { Pokemon } from '@/modules/pokemons/domain/Pokemon.ts';
import { computed, onMounted, ref } from 'vue';
import Chart from 'chart.js/auto';
import CustomButton from '@/sections/shared/components/CustomButton.vue';
import { XCircleIcon } from '@heroicons/vue/24/solid';
import { useRouter } from 'vue-router';
import { useTeamStore } from '@/sections/teams/stores/TeamStore.ts';
import { getPokemonTypesWithColors } from '@/modules/pokemons/application/getPokemonTypesWithColors.ts';
import { PokemonTypeWithColor } from '@/modules/pokemons/domain/PokemonTypeWithColor.ts';
import { usePokemonStatsChart } from '@/sections/teams/composables/usePokemonStatsChart.ts';

const router = useRouter();
const teamStore = useTeamStore();

const props = defineProps<{
  pokemon: Pokemon;
  removeFromTeam: () => void;
}>();

const { statsChart, setupChart } = usePokemonStatsChart({ type: 'radar' });

/*const statsChart = ref<HTMLCanvasElement | null>(null);*/

const pokemonTypes = computed<PokemonTypeWithColor[]>(() => {
  return getPokemonTypesWithColors(props.pokemon);
});

function redirectTeamDetail() {
  teamStore.setPokemon(props.pokemon);
  router.push('/team/' + props.pokemon.id);
}

onMounted(() => {
  setupChart(props.pokemon);
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
            },
          },
        },
      });
    }
  }
});*/
</script>

<template>
  <div
    @click="redirectTeamDetail"
    class="cursor-pointer max-w-sm w-full md:max-w-sm lg:max-w-md bg-white shadow-md rounded-lg p-4 mb-4 transform transition-transform duration-300 hover:translate-y-2"
  >
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
      <template v-for="type in pokemonTypes">
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

    <div class="w-full text-center">
      <CustomButton @click.stop="removeFromTeam">
        <template #default> Eliminar del equipo </template>
        <template #endIcon> <XCircleIcon /> </template>
      </CustomButton>
      <!--      <router-link :to="`/team/${pokemon.id}`" class="text-blue-500 hover:underline">
        Ver detalles
      </router-link>-->
    </div>
  </div>
</template>

<style scoped></style>
