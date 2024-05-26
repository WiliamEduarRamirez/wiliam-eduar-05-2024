import { PokemonRepository } from '@/modules/pokemons/domain/PokemonRepository.ts';
import { Pokemon } from '@/modules/pokemons/domain/Pokemon.ts';
import request from '@/shared/config/request.ts';
import { ApiPokemon, ApiPokemonResponse } from '@/modules/pokemons/infrastructure/ApiResponse.ts';

/*import { ENV } from '@/shared/config/environment.ts';*/

export function createApiPokemonRepository(): PokemonRepository {
  return {
    getPokemons,
    getPokemonGenderRateAndDescription,
    getPokemon,
    getPokemonEvolutionChainWithDetails,
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
        return await getPokemon(pokemon.name);
      }),
    );
    return response;
  } catch (err) {
    throw err;
  }
}
async function getPokemon(pokemonId: number | string): Promise<Pokemon> {
  try {
    const response = await request.get<ApiPokemon>(`/pokemon/${pokemonId}`);
    return mapToPokemon(response);
  } catch (err) {
    throw err;
  }
}
async function getPokemonGenderRateAndDescription(
  pokemon: Pokemon,
): Promise<{ genderRate: number; description: string }> {
  try {
    const response = await request.get<{
      gender_rate: number;
      flavor_text_entries: {
        flavor_text: string;
        language: {
          name: string;
          url: string;
        };
        version: {
          name: string;
          url: string;
        };
      }[];
    }>(`/pokemon-species/${pokemon.name}`);
    const description = response.flavor_text_entries.find(entry => entry.language.name === 'es');
    return { genderRate: response.gender_rate, description: description?.flavor_text || '' };
  } catch (err) {
    throw err;
  }
}

async function getPokemonEvolutionChainWithDetails(pokemon: Pokemon): Promise<{
  genderRate: number;
  description: string;
  evolutions: { name: string; image: string }[];
}> {
  try {
    const speciesResponse = await request.get<{
      gender_rate: number;
      flavor_text_entries: {
        flavor_text: string;
        language: {
          name: string;
          url: string;
        };
        version: {
          name: string;
          url: string;
        };
      }[];
      evolution_chain: {
        url: string;
      };
    }>(`/pokemon-species/${pokemon.name}`);

    const descriptionEntry = speciesResponse.flavor_text_entries.find(
      entry => entry.language.name === 'es',
    );
    const genderRate = speciesResponse.gender_rate;
    const description = descriptionEntry?.flavor_text || '';
    const evolutionChainUrl = speciesResponse.evolution_chain.url;

    const evolutionChainResponse = await request.get<{
      chain: {
        species: {
          name: string;
        };
        evolves_to: any[];
      };
    }>(evolutionChainUrl);

    const getEvolutionDetails = async (chain: any): Promise<{ name: string; image: string }[]> => {
      const evolutionDetails: { name: string; image: string }[] = [];
      const fetchEvolutionDetails = async (chain: any) => {
        const pokemonResponse = await getPokemon(chain.species.name);
        evolutionDetails.push({
          name: pokemonResponse.name,
          image: pokemonResponse.imageUrl,
        });
        for (const evolution of chain.evolves_to) {
          await fetchEvolutionDetails(evolution);
        }
      };
      await fetchEvolutionDetails(chain);
      return evolutionDetails;
    };

    const evolutionDetails = await getEvolutionDetails(evolutionChainResponse.chain);

    return {
      genderRate,
      description,
      evolutions: evolutionDetails,
    };
  } catch (err) {
    throw err;
  }
}

function mapToPokemon(response: ApiPokemon): Pokemon {
  return {
    id: response.id,
    name: response.name,
    height: response.height,
    weight: response.weight,
    abilities: response.abilities.map(ability => ability.ability.name),
    types: response.types.map(type => ({
      name: type.type.name,
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
}
