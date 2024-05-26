import { Pokemon } from '@/modules/pokemons/domain/Pokemon.ts';
import {
  pokemonTypeColors,
  PokemonTypeWithColor,
} from '@/modules/pokemons/domain/PokemonTypeWithColor.ts';

export function getPokemonTypesWithColors(pokemon: Pokemon): PokemonTypeWithColor[] {
  return pokemon.types.map(type => ({
    name: type.name,
    color: pokemonTypeColors[type.name] || '#000000',
  }));
}
