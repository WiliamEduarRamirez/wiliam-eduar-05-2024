<script setup lang="ts">
import Container from '@/sections/shared/components/CustomContainer.vue';
import { storeToRefs } from 'pinia';
import {useTeamStore} from "@/sections/teams/stores/TeamStore.ts";

const teamStore = useTeamStore()

const { teamPokemons } = storeToRefs(teamStore);
</script>

<template>
  <nav class="bg-primary text-white p-4 fixed top-0 left-0 right-0 z-10">
    <Container>
      <div class="flex justify-between items-center">
        <a href="/" class="text-2xl font-bold">Pokémon</a>
        <ul class="flex space-x-4">
          <li><router-link to="/" class="hover:text-secondary">Pokémons</router-link></li>
          <li>
            <router-link to="/team" class="hover:text-secondary">
              Equipo ({{ teamPokemons.length }})
            </router-link>
          </li>
        </ul>
      </div>
    </Container>
  </nav>
</template>

<style scoped></style>
