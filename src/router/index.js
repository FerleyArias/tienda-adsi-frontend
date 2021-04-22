import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

// Importamos el store
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// <--------- Lógica de protección de rutas -------->
// Recorre todas las rutas para evaluarlas si son protegidas o no
router.beforeEach((to, from, next) => {
  const login = to.matched.some(item => item.name === "login")  
  // Si la ruta tiene dentro una key llamada meta y su value es true validará si existe un token, si existe, puede entrar a la ruta
  const protected_route = to.matched.some(item => item.meta.requireAuth)  
  if(protected_route && !store.state.token) {
   next({name: 'login'})
  }
  else if(login && store.state.token)
  {
    next({name: 'home'})
  } else {
    next()
  }
})

export default router
