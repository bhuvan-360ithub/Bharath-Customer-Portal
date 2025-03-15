<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import Sidebar from './components/Sidebar.vue';
import Header from './components/Header.vue';

const isCollapsed = ref(false);
const isMobileMenuOpen = ref(false);
const route = useRoute();

// Hide Sidebar & Header on login page
const isAuthPage = computed(() => route.path === '/login');

const toggleSidebar = () => {
  if (window.innerWidth >= 1024) {
    isCollapsed.value = !isCollapsed.value;
  } else {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
  }
};

// Function to close the sidebar on mobile
const closeSidebar = () => {
  isMobileMenuOpen.value = false;
};
</script>

<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Mobile Sidebar Overlay -->
    <div 
      v-if="isMobileMenuOpen && !isAuthPage" 
      class="fixed inset-0 bg-gray-600 bg-opacity-50 z-20 lg:hidden"
      @click="closeSidebar">
    </div>

    <!-- Sidebar (Only if not on login page) -->
    <Sidebar 
      v-if="!isAuthPage"
      :is-collapsed="isCollapsed" 
      :is-mobile="isMobileMenuOpen"
      @close-sidebar="closeSidebar"
      class="fixed lg:static z-30 transition-transform duration-300"
      :class="[
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      ]"
    />

    <!-- Main Content Wrapper -->
    <div class="flex-1 flex flex-col">
      <!-- Header (Only if not on login page) -->
      <Header v-if="!isAuthPage" :toggle-sidebar="toggleSidebar" :is-collapsed="isCollapsed" />
      
      <!-- Router View for Page Content -->
      <main :class="['p-6', { 'mt-16': !isAuthPage }, 'flex-1']">
        <router-view></router-view> 
      </main>
    </div>
  </div>
</template>
