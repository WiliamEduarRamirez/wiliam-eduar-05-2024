import { Pokemon } from '@/modules/pokemons/domain/Pokemon.ts';

export interface PokemonRepository {
  getPokemons(limit: number, offset: number): Promise<Pokemon[]>;
}
