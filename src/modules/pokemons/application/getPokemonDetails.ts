import { PokemonRepository } from '@/modules/pokemons/domain/PokemonRepository.ts';
import { PokemonDetails } from '@/modules/pokemons/domain/PokemonDetails.ts';
import { Pokemon } from '@/modules/pokemons/domain/Pokemon.ts';
import { getPokemonTypesWithColors } from '@/modules/pokemons/application/getPokemonTypesWithColors.ts';

export function getPokemonDetails(pokemonRepository: PokemonRepository) {
  return async function (pokemonId: number, pokemon?: Pokemon): Promise<PokemonDetails> {
    try {
      if (!pokemon) {
        pokemon = await pokemonRepository.getPokemon(pokemonId);
      }

      const { genderRate, description, evolutions } =
        await pokemonRepository.getPokemonEvolutionChainWithDetails(pokemon);

      const female = genderRate >= 0 && genderRate <= 8;
      const male = genderRate >= 0 && genderRate <= 8;
      const none = genderRate === -1;

      const heightInMeters = pokemon.height / 10;
      const weightInKilograms = pokemon.weight / 10;

      const types = getPokemonTypesWithColors(pokemon);

      return {
        pokemon: pokemon,
        gender: {
          rate: genderRate,
          female,
          male,
          none,
        },
        height: heightInMeters,
        weight: weightInKilograms,
        description,
        evolutions,
        types,
      };
    } catch (err) {
      throw err;
    }
  };
}
