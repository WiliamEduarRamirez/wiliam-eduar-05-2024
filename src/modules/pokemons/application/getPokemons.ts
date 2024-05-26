// src/modules/pokemons/application/getPokemons.ts
import { PokemonRepository } from '@/modules/pokemons/domain/PokemonRepository';
import { Pokemon } from '@/modules/pokemons/domain/Pokemon';
import { pokemonTypeColors } from '@/modules/pokemons/domain/PokemonColors';

export function getPokemons(pokemonRepository: PokemonRepository) {
  return async function (limit: number, offset: number): Promise<Pokemon[]> {
    const pokemons: Pokemon[] = await pokemonRepository.getPokemons(limit, offset);
    return pokemons.map(pokemon => {
      return {
        ...pokemon,
        types: pokemon.types.map(type => ({
          ...type,
          color: pokemonTypeColors[type.name],
        })),
      };
    });
  };
}
