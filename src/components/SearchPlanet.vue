<template>
  <div class="container">
    <div class="flex justify-center">
      <input type="text" v-model="searchQuery" class="w-64 rounded-l px-4 py-2 focus:outline-none focus:border-blue-500 text-white" placeholder="Enter your search term">
      <button @click="loadPlanets" class="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-r px-4 py-2">Search</button>
    </div>
    <div class="flex justify-center">
      <div v-if="isLoading">
        <p class="text-white mt-5 text-center text-3xl">Loading...</p>
      </div>
      <div v-else>
        <div v-if="planet">
          <div class="card bg-white rounded mt-7">
            <h3 class="text-2xl mb-2 font-semibold">{{ planet.name }}</h3>
            <p><strong>Climate: </strong>{{ planet.climate }}</p>
            <p><strong>Diameter: </strong>{{ planet.diameter }}</p>
            <p><strong>Gravity: </strong>{{ planet.gravity }}</p>
            <p><strong>Orbital period: </strong>{{ planet.orbital_period }}</p>
            <p><strong>Population: </strong>{{ planet.population }}</p>
            <div><strong>Residents: </strong>
              <ul v-for="(resident, index) in planet.residents" :key="index">
                <li>-{{ resident }}</li>
              </ul>
            </div>
            <p><strong>Rotation period: </strong>{{ planet.rotation_period }}</p>
            <p><strong>Surface water: </strong>{{ planet.surface_water }}</p>
            <p><strong>Terrain: </strong>{{ planet.terrain }}</p>
            <div><strong>Films: </strong>
              <ul v-for="(film, index) in planet.films" :key="index">
                <li>-{{ film }}</li>
              </ul>
            </div>
          </div>
        </div>
        <div v-else-if="!isFound">
          <p class="text-xl mt-2 font-bold text-white">No matching planet found</p>
        </div>
        <div v-else>
          <div class="mt-10 flex flex-col items-center">
            <!-- <img src="../assets/r2d2.gif" class="w-[70%]"/> -->
            <p class="text-xl mt-2 font-bold text-white">Enter a search term to find a planet</p>
          </div>
        </div>
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
import { searchPlanet, getFilmsByTitle, getResidentsByName } from '../api/endpoints/star_wars_api'

const searchQuery: Ref<string> = ref('')
const planet: Ref<IPlanet | null> = ref(null)
const isLoading: Ref<boolean> = ref(false)
const isFound: Ref<boolean> = ref(true)

const loadPlanets = async() => {
  if (!searchQuery.value) isFound.value = false
  isLoading.value = true

  searchPlanets()
}

const searchPlanets = async() => {
  try{
    const planets = await searchPlanet(searchQuery.value)
    if (planets.length === 0) {
      planet.value = null
    } else {
      const selectedPlanet = planets[0]
      if (selectedPlanet.films?.length) {
        selectedPlanet.films = await getFilmsByTitle(selectedPlanet.films)
      }
      if (selectedPlanet.residents?.length) {
        selectedPlanet.residents = await getResidentsByName(selectedPlanet.residents)
      }
      planet.value = selectedPlanet
    }
  } catch(error){
    console.log('Error', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  loadPlanets()
  isLoading.value = false
})


</script>
