<template>
  <div class="container">
    <h1 class="text-center text-white font-bold">STAR WARS PLANETS</h1>
    <router-link :to="{name: 'SearchPlanetsView'}" class="flex justify-end">
      <button class="bg-white p-2 rounded">Search planets</button>
    </router-link>
    <div v-if="isLoading" class="text-white text-center text-3xl">Loading...</div>
    <div v-else class="flex flex-wrap justify-center mt-4">
      <PlanetDetails v-for="(planet, index) in planets" :key="index" :planet="planet"/>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PlanetsView'
}
</script>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'
import { RouterLink } from 'vue-router'
import { getPlanets } from '../api/endpoints/star_wars_api'
import PlanetDetails from '../components/PlanetDetails.vue'
import IPlanet from '../api/interfaces/IPlanet.interface'

const planets: Ref<IPlanet[]> = ref([])
const isLoading: Ref<boolean> = ref(true)

const loadPlanets = async() => {
  try{
    planets.value = await getPlanets()
  } catch(error){
    console.log('Error', error)
  }
  finally{
    isLoading.value = false
  }
}

onMounted(() => {
  loadPlanets()
})
</script>