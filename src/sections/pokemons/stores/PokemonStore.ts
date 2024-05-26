import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';
import { Pokemon } from '@/modules/pokemons/domain/Pokemon.ts';
import { createApiPokemonRepository } from '@/modules/pokemons/infrastructure/ApiPokemonRepository.ts';
import { PokemonRepository } from '@/modules/pokemons/domain/PokemonRepository.ts';
import { getPokemons } from '@/modules/pokemons/application/getPokemons.ts';
import { ENV } from '@/shared/config/environment.ts';

export function usePokemonStore(
  pokemonRepository: PokemonRepository = createApiPokemonRepository(),
) {
  return defineStore(
    'pokemon',
    () => {
      const pokemons: Ref<Pokemon[]> = ref([]);

      async function listPokemons() {
        try {
          if (pokemons.value.length) return;
          pokemons.value = await getPokemons(pokemonRepository)(ENV.INITIAL_POKEMON_LIMIT, 0);
        } catch (e) {
          throw e;
        }
      }

      async function loadMorePokemons() {
        try {
          const results = await getPokemons(pokemonRepository)(
            ENV.POKEMON_PAGE_LIMIT,
            pokemons.value.length,
          );
          pokemons.value = [...pokemons.value, ...results];
        } catch (e) {
          throw e;
        }
      }

      return {
        pokemons,
        listPokemons,
        loadMorePokemons,
      };
    },
    { persist: true },
  )();
}
