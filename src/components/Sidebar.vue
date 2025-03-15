<script setup lang="ts">
import {
  HomeIcon,
  Squares2X2Icon,
  ChartBarIcon,
  DocumentTextIcon,
  TableCellsIcon,
  WrenchScrewdriverIcon,
  ShoppingCartIcon,
} from '@heroicons/vue/24/outline';

defineProps<{
  isCollapsed: boolean;
}>();

const menuItems = [
  { name: 'Dashboard', icon: Squares2X2Icon, badge: '4', active: true },
  { name: 'Apps', icon: HomeIcon, active: false },
  { name: 'Orders', icon: ShoppingCartIcon, active: false },
  { name: 'UI Kits', icon: DocumentTextIcon, active: false },
  { name: 'Components', icon: WrenchScrewdriverIcon, active: false },
  { name: 'Tables', icon: TableCellsIcon, active: false },
];
</script>

<template>
  <aside :class="[
    'bg-white h-screen fixed top-0 left-0 transition-all duration-300 border-r z-30',
    isCollapsed ? 'w-20' : 'w-64'
  ]">
    <!-- Logo -->
    <div class="p-4 flex justify-center">
      <img src="/src/assets/logo.png" class="h-8" alt="Logo" />
    </div>

    <nav class="mt-4">
      <ul class="space-y-2">
        <li v-for="item in menuItems" :key="item.name">
          <a 
            href="#" 
            class="flex items-center p-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600"
            :class="[
              item.active ? 'bg-purple-100 text-purple-700 font-semibold' : '',
              isCollapsed ? 'justify-center' : 'pl-3'
            ]"
          >
            <component :is="item.icon" class="h-6 w-6" />
            <span v-if="!isCollapsed" class="ml-3">{{ item.name }}</span>
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>
