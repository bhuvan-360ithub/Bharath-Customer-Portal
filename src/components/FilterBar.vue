<template>
    <div class="flex justify-between items-center p-1 px-2 border border-gray-300 rounded-lg">
      <!-- Products Count -->
      <span class="text-md font-semibold">{{ totalProducts }} Products</span>
  
      <!-- Filter Button -->
      <button @click="$emit('toggleFilter')" class="filter-button">
        <i class="pi pi-filter"></i>
        <span>Filter</span>
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      totalProducts: Number,
    },
  };
  </script>
  
  <style>
  .filter-button {
    background-color: #c4d8ff;
    border-radius: 8px;
    padding: 10px 18px;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }
  .filter-button:hover {
    background-color: #9dbdff;
  }
  </style>
  