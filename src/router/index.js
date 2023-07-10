import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StartPage from '../views/StartPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    props: (route) => ({ score: route.query.score }),
    component: StartPage
  },
  {
    path: '/game',
    name: 'game',
    component: HomeView
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
