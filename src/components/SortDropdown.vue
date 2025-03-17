<template>
    <div class="relative">
      <!-- Sort Button -->
      <button @click="toggleDropdown" class="flex items-center space-x-2 text-gray-700">
        <span>Sort By: {{ selectedSort }}</span>
        <i :class="{'pi pi-chevron-down': !isOpen, 'pi pi-chevron-up': isOpen}"></i>
      </button>
  
      <!-- Desktop Dropdown -->
      <div v-if="isOpen" class="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-2 lg:block hidden select-none">
        <ul>
          <li class="p-2 hover:bg-gray-100 cursor-pointer" @click="selectOption('Price: Low to High')">Price: Low to High</li>
          <li class="p-2 hover:bg-gray-100 cursor-pointer" @click="selectOption('Price: High to Low')">Price: High to Low</li>
          <li class="p-2 hover:bg-gray-100 cursor-pointer" @click="selectOption('Newest First')">Newest First</li>
        </ul>
      </div>
  
      <!-- Mobile Bottom Sheet -->
      <transition name="slide-up">
        <div v-if="isOpen" class="fixed inset-x-0 bottom-0 bg-white p-4 shadow-lg rounded-t-md lg:hidden">
          <button @click="toggleDropdown" class="absolute top-2 right-2"><i class="pi pi-times"></i></button>
          <h3 class="text-lg font-bold">Sort By</h3>
          <ul>
            <li class="p-2 hover:bg-gray-100 cursor-pointer" @click="selectOption('Price: Low to High')">Price: Low to High</li>
            <li class="p-2 hover:bg-gray-100 cursor-pointer" @click="selectOption('Price: High to Low')">Price: High to Low</li>
            <li class="p-2 hover:bg-gray-100 cursor-pointer" @click="selectOption('Newest First')">Newest First</li>
          </ul>
        </div>
      </transition>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      selectedSort: String,
    },
    data() {
      return { isOpen: false };
    },
    methods: {
      toggleDropdown() {
        this.isOpen = !this.isOpen;
      },
      selectOption(option) {
        this.$emit("updateSort", option);
        this.isOpen = false; // Close dropdown after selection
      },
    },
  };
  </script>
  
  <style>
  /* Prevent text selection */
  .select-none {
    user-select: none;
  }
  
  /* Slide-up animation */
  .slide-up-enter-active, .slide-up-leave-active {
    transition: transform 0.3s ease-out;
  }
  .slide-up-enter, .slide-up-leave-to {
    transform: translateY(100%);
  }
  </style>
  