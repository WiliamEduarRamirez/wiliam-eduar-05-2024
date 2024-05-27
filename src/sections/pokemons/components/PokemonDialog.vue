<script setup lang="ts">
import { Pokemon } from '@/modules/pokemons/domain/Pokemon.ts';
import { useTeamStore } from '@/sections/teams/stores/TeamStore.ts';
import { storeToRefs } from 'pinia';
import CustomDialog from '@/sections/shared/components/CustomDialog.vue';
import CustomButton from '@/sections/shared/components/CustomButton.vue';
import { CheckCircleIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/vue/24/solid';
import { useRouter } from 'vue-router';

const props = defineProps<{
  isDialogOpen: boolean;
  closeDialog: Function;
  pokemonSelected: Pokemon | null;
}>();

const teamStore = useTeamStore();
const { teamPokemons } = storeToRefs(teamStore);

const router = useRouter();

function goToTeam() {
  router.push('/team');
  props.closeDialog();
}

function removeAndReplacePokemon(pokemon: Pokemon) {
  if (!props.pokemonSelected) return;
  teamStore.removePokemon(pokemon);
  teamStore.addPokemon(props.pokemonSelected);
  props.closeDialog();
}
</script>
<template>
  <teleport to="body">
    <CustomDialog
      :on-close="closeDialog"
      :is-open="isDialogOpen"
      :should-close-on-overlay-click="true"
    >
      <div>
        <h3 class="text-primary text-xl font-semi-bold">
          ¡Ups! No puedes seleccionar más de 6 pokémons
        </h3>
        <h4 class="text-secondary font-medium my-3">
          Tu equipo ya esta conformado por los siguientes pokémons:
        </h4>
        <ul>
          <li
            v-for="pokemon in teamPokemons"
            :key="pokemon.id"
            class="flex items-center space-x-2 py-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-primary"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.21.27-2.36.76-3.39l1.4 1.4c-.29.79-.46 1.64-.46 2.49 0 3.31 2.69 6 6 6 .85 0 1.7-.17 2.49-.46l1.4 1.4c-1.03.49-2.18.76-3.39.76zm6.24-2.41l-1.4-1.4c.29-.79.46-1.64.46-2.49 0-3.31-2.69-6-6-6-.85 0-1.7.17-2.49.46l-1.4-1.4C9.64 6.27 10.79 6 12 6c4.41 0 8 3.59 8 8 0 1.21-.27 2.36-.76 3.39zM12 8c-.83 0-1.5.67-1.5 1.5S11.17 11 12 11s1.5-.67 1.5-1.5S12.83 8 12 8z"
              />
            </svg>
            <span class="text-gray-500 font-light capitalize">{{ pokemon.name }}</span>
            <a
              @click="() => removeAndReplacePokemon(pokemon)"
              class="text-primary font-medium cursor-pointer hover:text-tertiary text-xs"
            >
              Remover y reemplazar
            </a>
          </li>
        </ul>
        <div class="w-full text-center mt-4">
          <CustomButton @click="closeDialog" color="secondary">
            <template #default>Entendido</template>
            <template #endIcon>
              <CheckCircleIcon />
            </template>
          </CustomButton>

          <CustomButton class="ml-3" @click="goToTeam">
            <template #default>Ver Equipo</template>
            <template #endIcon>
              <ArrowRightStartOnRectangleIcon />
            </template>
          </CustomButton>
        </div>
      </div>
    </CustomDialog>
  </teleport>
</template>
