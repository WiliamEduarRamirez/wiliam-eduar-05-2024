import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';
import { Pokemon } from '@/modules/pokemons/domain/Pokemon.ts';
import { PokemonRepository } from '@/modules/pokemons/domain/PokemonRepository.ts';
import { createApiPokemonRepository } from '@/modules/pokemons/infrastructure/ApiPokemonRepository.ts';
import { PokemonDetails } from '@/modules/pokemons/domain/PokemonDetails.ts';
import { getPokemonDetails } from '@/modules/pokemons/application/getPokemonDetails.ts';

export function useTeamStore(pokemonRepository: PokemonRepository = createApiPokemonRepository()) {
  return defineStore(
    'team',
    () => {
      const teamPokemons: Ref<Pokemon[]> = ref([]);
      const teamPokemonDetails = ref<PokemonDetails | null>(null);
      const teamPokemon = ref<Pokemon | null>(null);

      function addPokemon(pokemon: Pokemon) {
        teamPokemons.value = [...teamPokemons.value, pokemon];
      }

      function removePokemon(pokemon: Pokemon) {
        teamPokemons.value = teamPokemons.value.filter(p => p.id !== pokemon.id);
      }

      function setTeamPokemonDetails(pokemonDetails: PokemonDetails) {
        teamPokemonDetails.value = pokemonDetails;
      }
      function setPokemon(pokemon: Pokemon) {
        teamPokemon.value = pokemon;
      }

      async function loadTeamPokemonDetail(pokemonId: number, pokemon?: Pokemon) {
        try {
          const pokemonDetails = await getPokemonDetails(pokemonRepository)(pokemonId, pokemon);
          setTeamPokemonDetails(pokemonDetails);
        } catch (err) {
          throw err;
        }
      }

      return {
        teamPokemons,
        teamPokemon,
        teamPokemonDetails,

        addPokemon,
        removePokemon,
        setTeamPokemonDetails,
        loadTeamPokemonDetail,
        setPokemon,
      };
    },
    { persist: true },
  )();
}
