<script setup lang="ts">
import { useRoute } from 'vue-router';
import {
  HomeIcon,
  Squares2X2Icon,
  DocumentTextIcon,
  TableCellsIcon,
  WrenchScrewdriverIcon,
  ShoppingCartIcon,
  ShoppingBagIcon,
} from '@heroicons/vue/24/outline';

defineProps<{
  isCollapsed: boolean;
}>();

const emit = defineEmits(['close-sidebar']);
const route = useRoute();

const menuItems = [
  { name: 'Dashboard', icon: Squares2X2Icon, path: '/' },
  { name: 'Apps', icon: HomeIcon, path: '/login' },
  { name: 'Orders', icon: ShoppingCartIcon, path: '/orders' },
  { name: 'Products', icon: ShoppingBagIcon, path: '/products' },
  { name: 'Components', icon: WrenchScrewdriverIcon, path: '/components' },
  { name: 'Tables', icon: TableCellsIcon, path: '/tables' },
];

const handleNavigation = () => {
  if (window.innerWidth < 1024) {
    emit('close-sidebar'); // Close sidebar on mobile
  }
};
</script>

<template>
  <aside 
    :class="[
      'bg-white h-screen fixed top-0 left-0 transition-all duration-300 border-r z-30',
      isCollapsed ? 'w-20' : 'w-64'
    ]"
  >
    <!-- Logo -->
    <div class="p-4 flex justify-center">
      <img src="/src/assets/logo.png" class="h-8" alt="Logo" />
    </div>

    <!-- Navigation Menu -->
    <nav class="mt-4">
      <ul class="space-y-2">
        <li v-for="item in menuItems" :key="item.name">
          <router-link 
            :to="item.path" 
            class="flex items-center p-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-md"
            :class="[
              isCollapsed ? 'justify-center' : 'pl-3',
              route.path === item.path ? 'bg-purple-100 text-purple-700 font-semibold' : ''
            ]"
            @click="handleNavigation"
          >
            <component :is="item.icon" class="h-6 w-6" />
            <span v-if="!isCollapsed" class="ml-3">{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>
