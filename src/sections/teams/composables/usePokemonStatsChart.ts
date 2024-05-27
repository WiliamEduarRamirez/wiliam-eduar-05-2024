import { ref } from 'vue';
import { Chart, registerables } from 'chart.js';
import { Pokemon } from '@/modules/pokemons/domain/Pokemon';

// Registrar todos los componentes de Chart.js
Chart.register(...registerables);

type ChartType = 'radar' | 'bar';

interface ChartConfig {
  type: ChartType;
}

export function usePokemonStatsChart(config: ChartConfig) {
  const statsChart = ref<HTMLCanvasElement | null>(null);
  const setupChart = (pokemon: Pokemon) => {
    if (!statsChart.value) return;
    const ctx = statsChart.value.getContext('2d');
    if (!ctx) return;

    const labels = ['HP', 'Ataque', 'Defensa', 'Ataque especial', 'Defensa especial', 'Velocidad'];
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Estadística',
          data: [
            pokemon.stats.hp,
            pokemon.stats.attack,
            pokemon.stats.defense,
            pokemon.stats.specialAttack,
            pokemon.stats.specialDefense,
            pokemon.stats.speed,
          ],
          backgroundColor:
            config.type === 'radar'
              ? 'rgba(75, 192, 192, 0.2)'
              : [
                  'rgba(255, 99, 132, 0.2)', // HP
                  'rgba(54, 162, 235, 0.2)', // Ataque
                  'rgba(255, 206, 86, 0.2)', // Defensa
                  'rgba(75, 192, 192, 0.2)', // Ataque especial
                  'rgba(153, 102, 255, 0.2)', // Defensa especial
                  'rgba(255, 159, 64, 0.2)', // Velocidad
                ],
          borderColor:
            config.type === 'radar'
              ? 'rgba(75, 192, 192, 1)'
              : [
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

    const options =
      config.type === 'radar'
        ? {
            scales: {
              r: {
                beginAtZero: true,
              },
            },
          }
        : {
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
          };

    new Chart(ctx, {
      type: config.type,
      data: data,
      options: options,
    });
  };
  return { statsChart, setupChart };
}
