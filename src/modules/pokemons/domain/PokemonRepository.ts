import { Pokemon } from '@/modules/pokemons/domain/Pokemon.ts';

export interface PokemonRepository {
  getPokemons(limit: number, offset: number): Promise<Pokemon[]>;
  getPokemon(pokemonId: number | string): Promise<Pokemon>;
  getPokemonGenderRateAndDescription(
    pokemon: Pokemon,
  ): Promise<{ genderRate: number; description: string }>;
  getPokemonEvolutionChainWithDetails(pokemon: Pokemon): Promise<{
    genderRate: number;
    description: string;
    evolutions: { name: string; image: string }[];
  }>;
}
