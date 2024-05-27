<script setup lang="ts">
import { useRouter } from 'vue-router';
import CustomButton from '@/sections/shared/components/CustomButton.vue';
import { ArrowRightStartOnRectangleIcon } from '@heroicons/vue/24/solid';
import { Pokemon } from '@/modules/pokemons/domain/Pokemon.ts';

defineProps<{
  pokemons: Pokemon[];
}>();

const router = useRouter();

function goToTeam() {
  router.push('/team');
}
</script>

<template>
  <div class="mb-4 w-full flex flex-col md:flex-row items-center justify-between">
    <h3 class="text-secondary font-medium text-base mb-2 md:mb-0">
      Pokémons disponibles: {{ pokemons.length }}
    </h3>
    <CustomButton @click="goToTeam" color="secondary">
      <template #default>Ver Equipo</template>
      <template #endIcon>
        <ArrowRightStartOnRectangleIcon />
      </template>
    </CustomButton>
  </div>
</template>
