<template>
  <div class="container">
    <div class="flex justify-center">
      <input type="text" v-model="searchQuery" class="w-64 rounded-l px-4 py-2 focus:outline-none focus:border-blue-500 text-white" placeholder="Enter your search term">
      <button @click="loadPlanets" class="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-r px-4 py-2">Search</button>
    </div>
    <div class="flex justify-center">
      <div v-if="isLoading">
        <p class="text-white">Loading...</p>
      </div>
      <div v-else>
        <div v-if="planet.length === 0">
          <div class="mt-10 flex flex-col items-center">
            <!-- <img src="../assets/r2d2.gif" class="w-[70%]"/> -->
            <p class="text-xl mt-2 font-bold text-white">There's no data</p>
          </div>
        </div>
        <div v-else>
          <div v-for="(item, index) in planet" :key="index" class="card bg-white rounded mt-7">
            <h3 class="text-2xl mb-2 font-semibold">{{ item.name }}</h3>
            <p><strong>Climate: </strong>{{ item.climate }}</p>
            <p><strong>Diameter: </strong>{{ item.diameter }}</p>
            <p><strong>Gravity: </strong>{{ item.gravity }}</p>
            <p><strong>Orbital period: </strong>{{ item.orbital_period }}</p>
            <p><strong>Population: </strong>{{ item.population }}</p>
            <div><strong>Residents: </strong>
              <ul v-for="(resident, index) in item.residents" :key="index">
                <li>-{{ resident }}</li>
              </ul>
            </div>
            <p><strong>Rotation period: </strong>{{ item.rotation_period }}</p>
            <p><strong>Surface water: </strong>{{ item.surface_water }}</p>
            <p><strong>Terrain: </strong>{{ item.terrain }}</p>
            <div><strong>Films: </strong>
              <ul v-for="(film, index) in item.films" :key="index">
                <li>-{{ film }}</li>
              </ul>
            </div>
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
const planet: Ref<IPlanet[]> = ref([])
const isLoading: Ref<boolean> = ref(false)

const loadPlanets = async() => {
  isLoading.value = true

  searchPlanets()
}

const searchPlanets = async() => {
  try{
    planet.value = await searchPlanet(searchQuery.value)
    for (const item of planet.value) {
      if (item.films?.length) {
        const filmTitles = await getFilmsByTitle(item.films)
        item.films = filmTitles
      }
      if (item.residents?.length){
        const residentNames = await getResidentsByName(item.residents)
        item.residents = residentNames
      }
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
