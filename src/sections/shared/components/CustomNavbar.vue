<script setup lang="ts">
import Container from '@/sections/shared/components/CustomContainer.vue';
import { storeToRefs } from 'pinia';
import { useTeamStore } from '@/sections/teams/stores/TeamStore.ts';

const teamStore = useTeamStore();

const { teamPokemons } = storeToRefs(teamStore);
</script>

<template>
  <nav class="bg-primary text-white py-4 fixed top-0 left-0 right-0 z-10">
    <Container tag="nav">
      <div class="flex justify-between items-center">
        <router-link to="/" class="text-xl md:text-2xl font-bold">Pokémon</router-link>
        <ul class="flex space-x-4">
          <li>
            <router-link to="/" class="text-sm md:text-base hover:text-secondary">
              Pokémons
            </router-link>
          </li>
          <li>
            <router-link to="/team" class="text-sm md:text-base hover:text-secondary">
              Equipo ({{ teamPokemons.length }})
            </router-link>
          </li>
        </ul>
      </div>
    </Container>
  </nav>
</template>

<style scoped></style>
