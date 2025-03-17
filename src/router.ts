import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Dashboard from './views/Dashboard.vue';
import Orders from './views/Orders.vue';
import Login from './views/Login.vue';
import Products from './views/Products.vue';
import ProductDetails from './views/ProductDetails.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Dashboard },
  {path: '/orders', component: Orders},
  {path: '/login', component: Login},
  {path: '/products', component: Products},
  {path: '/productdetails', component: ProductDetails},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
