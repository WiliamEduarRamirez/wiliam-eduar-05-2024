// src/modules/pokemons/application/getPokemons.ts
import { PokemonRepository } from '@/modules/pokemons/domain/PokemonRepository';
import { Pokemon } from '@/modules/pokemons/domain/Pokemon';

export function getPokemons(pokemonRepository: PokemonRepository) {
  return async function (limit: number, offset: number): Promise<Pokemon[]> {
    return  pokemonRepository.getPokemons(limit, offset);
  };
}
