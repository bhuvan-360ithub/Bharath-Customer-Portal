<template>
    <div class="fixed top-0 left-0 w-80 h-screen bg-white shadow-lg p-4 
              transform transition-transform duration-500 ease-in-out 
              translate-x-0 rounded-r-lg overflow-y-auto z-50">
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-lg font-bold">Filter</h2>
        <button @click="$emit('close')" class="p-2">
          <i class="pi pi-times"></i>
        </button>
      </div>
      <hr class="mb-3">
  
      <div v-for="(section, index) in filters" :key="index" class="mb-3">
        <div class="flex justify-between items-center cursor-pointer" @click="toggleSection(index)">
          <h3 class="text-md font-semibold">{{ section.title }}</h3>
          <button>
            <i :class="section.expanded ? 'pi pi-minus' : 'pi pi-plus'"></i>
          </button>
        </div>
        <hr v-if="index === 0" class="my-2">
        <div v-show="section.expanded" class="mt-2 space-y-2">
          <div v-for="(item, i) in section.options" :key="i" class="flex items-center gap-2">
            <input type="checkbox" :id="`${section.title}-${i}`" class="form-checkbox">
            <label :for="`${section.title}-${i}`" class="text-sm">{{ item.label }}</label>
          </div>
        </div>
        <hr v-if="section.title !== 'Brand'" class="mt-3 w-3/4">
      </div>
  
      <div class="mb-3">
        <div class="flex justify-between items-center cursor-pointer" @click="toggleBrand()">
          <h3 class="text-md font-semibold">Brand</h3>
          <button>
            <i :class="brandExpanded ? 'pi pi-minus' : 'pi pi-plus'"></i>
          </button>
        </div>
        <div v-show="brandExpanded" class="mt-2 space-y-2">
          <div v-for="(brand, i) in brandFilters" :key="i" class="flex items-center gap-2">
            <input type="checkbox" :id="`brand-${i}`" class="form-checkbox">
            <img :src="brand.image" class="w-6 h-6 rounded-full border-2 border-gray-300" alt="brand logo">
            <label :for="`brand-${i}`" class="text-sm">{{ brand.name }}</label>
          </div>
        </div>
      </div>
  
      <hr class="my-3">
      <div class="flex justify-end">
        <button class="bg-blue-600 text-white px-4 py-2 rounded">Apply Filter</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        filters: [
          { 
            title: 'Categories', 
            expanded: true, 
            options: [
              { label: 'Wires & Cables' }, 
              { label: 'Fuses' }, 
              { label: 'Lights & Bulbs' }, 
              { label: 'Pipes & Bends' }, 
              { label: 'Electrical Boxes' }, 
              { label: 'Category 6' }, 
              { label: 'Switches & Outlets' }, 
              { label: 'Generators' }, 
              { label: 'Motors & Motor Controls' }, 
              { label: 'Transformers' }, 
              { label: 'Solar Power Parts' }, 
              { label: 'Air Conditioning' }, 
              { label: 'Heaters' }, 
              { label: 'Fans' }, 
              { label: 'Small Appliances' }
            ] 
          },
        ],
        brandExpanded: true,
        brandFilters: [
          { name: 'Havells', image: new URL('../assets/Havells.png', import.meta.url).href },
          { name: 'Polycab', image: new URL('../assets/Polycab.png', import.meta.url).href },
          { name: 'Anchor', image: new URL('../assets/Anchor.png', import.meta.url).href },
          { name: 'Finolex Cables', image: new URL('../assets/Finolex.png', import.meta.url).href },
          { name: 'Philips', image: new URL('../assets/Philips.png', import.meta.url).href },
          { name: 'Wipro', image: new URL('../assets/Wipro.png', import.meta.url).href },
          { name: 'Bajaj', image: new URL('../assets/Bajaj.png', import.meta.url).href },
        ]
      };
    },
    methods: {
      toggleSection(index) {
        this.filters[index].expanded = !this.filters[index].expanded;
      },
      toggleBrand() {
        this.brandExpanded = !this.brandExpanded;
      }
    }
  };
  </script>
  
  <style>
  .form-checkbox {
    width: 16px;
    height: 16px;
  }
  </style>
  