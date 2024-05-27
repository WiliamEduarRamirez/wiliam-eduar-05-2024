<script setup lang="ts">
import { usePokemonStatsChart } from '@/sections/teams/composables/usePokemonStatsChart.ts';
import { PokemonDetails } from '@/modules/pokemons/domain/PokemonDetails.ts';
import { watch } from 'vue';

const props = defineProps<{
  teamPokemonDetails: PokemonDetails | null;
}>();
const { statsChart, setupChart } = usePokemonStatsChart({
  type: 'bar',
});

watch(
  () => props.teamPokemonDetails,
  value => {
    if (!value) return;
    setupChart(value.pokemon);
  },
  { immediate: true },
);
</script>

<template>
  <h2
    class="text-center col-span-1 lg:col-span-2 text-primary text-2xl xl:text-3xl font-semi-bold capitalize"
  >
    Estadísticas
  </h2>
  <div class="col-span-1 lg:col-span-2 flex justify-center items-center">
    <div class="w-full px-0 md:px-5 xl:w-3/4 aspect-auto">
      <canvas class="w-full h-full" ref="statsChart"></canvas>
    </div>
  </div>
</template>
