<script setup lang="ts">
import { ref } from 'vue';
import Sidebar from './components/Sidebar.vue';
import Header from './components/Header.vue';

const isCollapsed = ref(false);
const isMobileMenuOpen = ref(false);

const toggleSidebar = () => {
  if (window.innerWidth >= 1024) {
    isCollapsed.value = !isCollapsed.value;
  } else {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
  }
};
</script>

<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Mobile Sidebar Overlay -->
    <div 
      v-if="isMobileMenuOpen" 
      class="fixed inset-0 bg-gray-600 bg-opacity-50 z-20 lg:hidden"
      @click="isMobileMenuOpen = false">
    </div>

    <!-- Sidebar -->
    <Sidebar 
      :is-collapsed="isCollapsed" 
      :is-mobile="isMobileMenuOpen"
      class="fixed lg:static z-30 transition-transform duration-300"
      :class="[
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      ]"
    />

    <!-- Main Content Wrapper -->
    <div class="flex-1 flex flex-col">
      <Header :toggle-sidebar="toggleSidebar" :is-collapsed="isCollapsed" />
      
      <!-- Router View for Page Content -->
      <main class="p-6 mt-16 flex-1">
        <router-view></router-view> 
      </main>
    </div>
  </div>
</template>
