import { RouteRecordRaw } from 'vue-router';

const pokemonRouter: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/sections/pokemons/views/PokemonViews.vue'),
  },
];

export default pokemonRouter;
