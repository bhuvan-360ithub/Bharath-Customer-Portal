<script setup lang="ts">
import {
  BellIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
} from '@heroicons/vue/24/outline';
import { ref, defineProps } from 'vue';
import defaultUserImage from '../assets/user.png'; // Import user image

const showNotifications = ref(false);
const showProfile = ref(false);

const props = defineProps<{
  toggleSidebar: () => void;
  isCollapsed: boolean;
  profileImage?: string; // Allow dynamic profile image with fallback
}>();

const closeDropdowns = () => {
  showNotifications.value = false;
  showProfile.value = false;
};
</script>

<template>
  <header 
    class="bg-white h-16 fixed top-0 border-b px-4 flex items-center justify-between z-50 transition-all w-full"
    :class="[
      props.isCollapsed ? 'lg:w-[calc(100%-5rem)] lg:left-20' : 'lg:w-[calc(100%-16rem)] lg:left-64'
    ]"
  >
    <!-- Left: Menu Button + Search -->
    <div class="flex items-center space-x-3">
      <button @click="toggleSidebar" class="p-2 hover:bg-gray-100 rounded-lg">
        <Bars3Icon class="h-6 w-6 text-gray-600" />
      </button>

      <!-- Search (Hidden on Mobile) -->
      <div class="relative hidden lg:block w-40 md:w-64">
        <MagnifyingGlassIcon class="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search..."
          class="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full"
        />
      </div>
    </div>

    <!-- Center: Logo (Only on Mobile) -->
    <div class="absolute left-1/2 transform -translate-x-1/2 lg:hidden">
      <img src="/src/assets/logo.png" class="h-8" alt="Logo" />
    </div>

    <!-- Right: Notifications & Profile -->
    <div class="flex items-center space-x-3 ml-auto">
      <button @click="showNotifications = !showNotifications; showProfile = false" class="p-2 hover:bg-gray-100 rounded-lg relative">
        <BellIcon class="h-6 w-6 text-gray-600" />
        <span class="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
      </button>

      <div class="relative">
        <button @click="showProfile = !showProfile; showNotifications = false" class="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
          <img 
            :src="props.profileImage || defaultUserImage" 
            alt="Profile Image" 
            class="h-10 w-10 rounded-full border-2 border-gray-300 object-cover"
          />
        </button>

        <div v-if="showProfile" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2" @click.outside="closeDropdowns">
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Your Profile</a>
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Settings</a>
          <div class="border-t my-1"></div>
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Sign out</a>
        </div>
      </div>
    </div>
  </header>
</template>
