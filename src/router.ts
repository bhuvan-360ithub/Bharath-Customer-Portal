import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Dashboard from './views/Dashboard.vue';
import Settings from './views/Settings.vue';
import Orders from './views/Orders.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Dashboard },
  { path: '/settings', component: Settings },
  {path: '/orders', component: Orders},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
