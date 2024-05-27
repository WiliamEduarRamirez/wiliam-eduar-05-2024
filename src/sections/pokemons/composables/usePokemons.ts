import { inject, onMounted, Ref, ref } from 'vue';
import { PokemonRepository } from '@/modules/pokemons/domain/PokemonRepository';
import { usePokemonStore } from '@/sections/pokemons/stores/PokemonStore';
import { storeToRefs } from 'pinia';

export function usePokemons() {
  const pokemonRepository = inject<PokemonRepository>('pokemonRepository')!;
  const pokemonStore = usePokemonStore(pokemonRepository);
  const { pokemons, maxPokemonLimit } = storeToRefs(pokemonStore);

  const isLoading: Ref<boolean> = ref(true);

  function scrollHandler() {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight && !isLoading.value && !maxPokemonLimit.value) {
      isLoading.value = true;
      pokemonStore.loadMorePokemons().finally(() => {
        isLoading.value = false;
      });
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', scrollHandler);

    pokemonStore.listPokemons().finally(() => {
      isLoading.value = false;
    });

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  });

  return {
    pokemons,
    isLoading,
    maxPokemonLimit,
  };
}
