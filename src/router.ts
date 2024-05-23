import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import SearchPlanetsView from "./views/SearchPlanetsView.vue";
import PlanetsView from './views/PlanetsView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'PlanetsView',
    component: PlanetsView
  },
  {
    path: '/searchPlanet',
    name: 'SearchPlanetsView',
    component: SearchPlanetsView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router