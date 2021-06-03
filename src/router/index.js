import {createRouter, createWebHistory} from 'vue-router';
import Home from '@/views/Home.vue';
import Category from '@/views/Category.vue';
import Article from '@/views/Article.vue';
import Income from '@/views/Income.vue';
import Vendors from '@/views/Vendors.vue';
import Sales from '@/views/Sales.vue';
import Customers from '@/views/Customers.vue';
import Users from '@/views/Users.vue';

// Importamos el store
import store from '../store';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/category',
    name: 'category',
    component: Category,
    meta: {
      requireAuth: true,
      almacenista: true,
    },
  },
  {
    path: '/article',
    name: 'article',
    component: Article,
    meta: {
      requireAuth: true,
      almacenista: true,
    },  
  },
  {
    path: '/income',
    name: 'income',
    component: Income,
    meta: {
      requireAuth: true,
      almacenista: true,
    },
  },
  {
    path: '/vendors',
    name: 'vendors',
    component: Vendors,
    meta: {
      requireAuth: true,
      almacenista: true,
    },
  },
  {
    path: '/sales',
    name: 'sales',
    component: Sales,
    meta: {
      requireAuth: true,
      vendedor: true,
    },
  },
  {
    path: '/customers',
    name: 'customers',
    component: Customers,
    meta: {
      requireAuth: true,
      vendedor: true,
    },
  },
  {
    path: '/users',
    name: 'users',
    component: Users,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// <--------- Lógica de protección de rutas -------->
// Recorre todas las rutas para evaluarlas si son protegidas o no
router.beforeEach((to, from, next) => {
  const login = to.matched.some(item => item.name === 'login');
  // Si la ruta tiene dentro una key llamada meta y su value es true validará si existe un token, si existe, puede entrar a la ruta
  const protected_route = to.matched.some(item => item.meta.requireAuth);
  const vendedor = to.matched.some(item => !item.meta.vendedor);
//   const almacenista = to.matched.some(item => item.meta.almacenista);

  if (protected_route && !store.state.token) {
    next({name: 'login'});
  } else if (login && store.state.token) {
    next({name: 'home'});
  } else if (vendedor && (store.state.userLogin.rol == 'vendedor')) {
    next({name: 'home'});
  } else {
    next();
  }
});

export default router;
