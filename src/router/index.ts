// Composables
import { createRouter, createWebHistory } from 'vue-router'


import CatFactDetails from '../views/CatFactDetails.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },

  {
    path: '/details/:id',
    name: 'CatFactDetails',
    component: CatFactDetails,
  },
 
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
