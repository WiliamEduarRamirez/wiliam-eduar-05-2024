import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useTeamStore } from '@/sections/teams/stores/TeamStore.ts';
import { ENV } from '@/shared/config/environment.ts';

const validateTeam = (
  to: RouteLocationNormalized,
  _: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const pokemonId = Number(to.params.id as string);

  if (isNaN(pokemonId)) {
    next({ name: 'Team' });
    return;
  }

  const teamStore = useTeamStore();
  const teamLimit = ENV.MAX_POKEMON_SELECTED;

  const existingTeam = teamStore.teamPokemons.some(pokemon => pokemon.id === pokemonId);

  if (existingTeam && teamStore.teamPokemons.length <= teamLimit) {
    next();
  } else {
    next({ name: 'Team' });
  }
};

export default validateTeam;
