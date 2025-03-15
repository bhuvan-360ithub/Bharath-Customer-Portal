import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Dashboard from './views/Dashboard.vue';
import Orders from './views/Orders.vue';
import Login from './views/Login.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Dashboard },
  {path: '/orders', component: Orders},
  {path: '/login', component: Login},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
