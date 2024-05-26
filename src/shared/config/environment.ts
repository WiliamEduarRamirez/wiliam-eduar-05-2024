const API_URL: string = import.meta.env.VITE_API_URL as string;
const MAX_POKEMON_SELECTED: number = Number(import.meta.env.VITE_MAX_POKEMON_SELECTED);
const POKEMON_PAGE_LIMIT: number = Number(import.meta.env.VITE_POKEMON_PAGE_LIMIT);
const INITIAL_POKEMON_LIMIT: number = Number(import.meta.env.VITE_INITIAL_POKEMON_LIMIT);

export const ENV = {
  API_URL,
  MAX_POKEMON_SELECTED,
  POKEMON_PAGE_LIMIT,
  INITIAL_POKEMON_LIMIT,
};
