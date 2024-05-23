<template>
  <div class="container">
    <h1 class="text-center text-white font-bold">STAR WARS PLANETS</h1>
    <router-link :to="{name: 'PlanetsView'}" class="flex">
      <button class="bg-white p-2 rounded"><i class="fa-solid fa-arrow-left fa-lg mr-2"></i>Go back</button>
    </router-link>
    <SearchPlanet/>  
  </div>
</template>

<script lang="ts">
export default {
  name: 'SearchPlanetsView'
}
</script>

<script setup lang="ts">
import SearchPlanet from '../components/SearchPlanet.vue';
</script>