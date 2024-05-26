import { PokemonRepository } from '@/modules/pokemons/domain/PokemonRepository.ts';
import { Pokemon } from '@/modules/pokemons/domain/Pokemon.ts';
import request from '@/shared/config/request.ts';
import { ApiPokemon, ApiPokemonResponse } from '@/modules/pokemons/infrastructure/ApiResponse.ts';

/*import { ENV } from '@/shared/config/environment.ts';*/

export function createApiPokemonRepository(): PokemonRepository {
  return {
    getPokemons,
  };
}

async function getPokemons(limit: number, offset: number): Promise<Pokemon[]> {
  try {
    const result = await request.get<ApiPokemonResponse>(
      `/pokemon?limit=${limit}&offset=${offset}`,
    );
    const pokemons = result.results.map(pokemon => ({
      name: pokemon.name,
    }));
    const response: Pokemon[] = await Promise.all(
      pokemons.map(async pokemon => {
        return await request.get<ApiPokemon>(`/pokemon/${pokemon.name}`).then(response => {
          const pokemon: Pokemon = {
            id: response.id,
            name: response.name,
            height: response.height,
            weight: response.weight,
            abilities: response.abilities.map(ability => ability.ability.name),
            types: response.types.map(type => ({
              name: type.type.name,
              color: '#000000',
            })),
            imageUrl: response.sprites.front_default,
            stats: {
              hp: response.stats[0]?.base_stat || 0,
              attack: response.stats[1]?.base_stat || 0,
              defense: response.stats[2]?.base_stat || 0,
              specialAttack: response.stats[3]?.base_stat || 0,
              specialDefense: response.stats[4]?.base_stat || 0,
              speed: response.stats[5].base_stat || 0,
            },
            sound: response.cries.latest,
          };
          return pokemon;
        });
      }),
    );
    return response;
  } catch (err) {
    throw err;
  }
}
