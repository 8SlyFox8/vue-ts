import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '@/views/MainView.vue'

const routes = [
  { path: '/', component: HomeView },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})