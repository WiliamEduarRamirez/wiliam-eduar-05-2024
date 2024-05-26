import { Pokemon } from '@/modules/pokemons/domain/Pokemon.ts';
import { PokemonTypeWithColor } from '@/modules/pokemons/domain/PokemonTypeWithColor.ts';

export interface PokemonDetails {
  pokemon: Pokemon;
  description: string;
  gender: {
    rate: number;
    female: boolean;
    male: boolean;
    none: boolean;
  };
  height: number;
  weight: number;
  evolutions: { name: string; image: string }[];
  types: PokemonTypeWithColor[];
}
