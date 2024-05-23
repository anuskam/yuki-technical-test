<template>
  <div class="container">
    <div class="searcher">
      <input type="text" v-model="searchQuery" class="rounded-l px-4 py-2 focus:outline-none focus:border-blue-500" placeholder="Enter your search term">
      <button @click="searchPlanets" class="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-r px-4 py-2">Search</button>
    </div>
    <div class="info">
      <div v-if="planet.length === 1">
        <div v-for="(item, index) in planet" :key="index">
          <h3 class="text-2xl mb-2 font-semibold">{{ item.name }}</h3>
          <p>Climate: {{ item.climate }}</p>
          <p>Diameter: {{ item.diameter }}</p>
          <p>Gravity: {{ item.gravity }}</p>
          <p>Orbital period: {{ item.orbitalPeriod }}</p>
          <p>Population: {{ item.population }}</p>
          <ul v-for="(resident, index) in item.residents" :key="index">
            <li>{{ resident }}</li>
          </ul>
          <p>Rotation period: {{ item.rotationPeriod }}</p>
          <p>Surface water: {{ item.surfaceWater }}</p>
          <p>Terrain: {{ item.terrain }}</p>
          <p>Films: {{ item.surfaceWater }}</p>
        </div>
      </div>
      <div v-else>
        No tiene contenido
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SearchPlanet'
}
</script>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'
import IPlanet from '../api/interfaces/IPlanet.interface'
import { searchPlanet, getFilmsTitle } from '../api/endpoints/star_wars_api'

const searchQuery: Ref<string> = ref('')
const planet: Ref<IPlanet[]> = ref([])
const isLoading: Ref<boolean> = ref(true)
const filmTitles: Ref<string[]> = ref([]);

const searchPlanets = async() => {
  try{
    console.log('searchQuery', searchQuery.value)
    planet.value = planet.value ? await searchPlanet(searchQuery.value) : []
  } catch(error){
    console.log('Error', error)
  }
  finally{
    isLoading.value = false
  }
}

onMounted(async () => {
  searchPlanets()
  filmTitles.value = await getFilmsTitle(['patataa'])
})
</script>
