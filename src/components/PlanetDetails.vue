<template>
  <div class="flex">
    <div class="card bg-yellow-200 m-2 w-60 rounded-md text-black">
      <h3 class="text-2xl mb-2 font-semibold">{{ planet.name }}</h3>
      <div v-for="(film, index) in filmTitles" :key="index">
        <i class="fa-solid fa-jedi"></i>
        {{ film }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PlanetDetails'
}
</script>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'
import IPlanet from '../api/interfaces/IPlanet.interface'
import { getFilmsByTitle } from '../api/endpoints/star_wars_api'
const props = defineProps<{ 
  planet: IPlanet
}>()
const filmTitles: Ref<string[]> = ref([]);

onMounted(async() => {
  filmTitles.value = await getFilmsByTitle(props.planet.films)
})
</script>
