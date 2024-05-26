import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';
import { Pokemon } from '@/modules/pokemons/domain/Pokemon.ts';

export function useTeamStore() {
  return defineStore(
    'team',
    () => {
      const teamPokemons: Ref<Pokemon[]> = ref([]);

      function addPokemon(pokemon: Pokemon) {
        teamPokemons.value = [...teamPokemons.value, pokemon];
      }

      function removePokemon(pokemon: Pokemon) {
        teamPokemons.value = teamPokemons.value.filter(p => p.id !== pokemon.id);
      }

      return {
        teamPokemons,
        addPokemon,
        removePokemon,
      };
    },
    { persist: true },
  )();
}
