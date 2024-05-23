<template>
  <PlanetsView v-if="isVisible"/>
  <SearchPlanetsView v-else/>
</template>

<script setup lang="ts">
import PlanetsView from './views/PlanetsView.vue';
import SearchPlanetsView from './views/SearchPlanetsView.vue';
import type { Ref } from 'vue'
import { ref } from 'vue'

const isVisible: Ref<boolean> = ref(true)

</script>