<template>
    <div class="container mx-auto p-6">
      <div class="flex flex-col md:flex-row gap-4">
        <!-- Left Section: Product Images -->
        <div class="md:w-1/2 flex flex-col items-center">
          <!-- Large Image with Fixed 1:1 Ratio -->
          <div class="w-full flex justify-center">
            <img 
              :src="selectedImage" 
              class="w-full max-w-xs md:max-w-lg aspect-square object-cover rounded-lg border"
            />
          </div>
  
          <!-- Thumbnails (Below in Mobile, Side in Desktop) -->
          <div class="flex gap-2 mt-4 md:mt-6 flex-wrap justify-center">
            <img
              v-for="(image, index) in product.images"
              :key="index"
              :src="image"
              class="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg border cursor-pointer"
              :class="{ 'border-2 border-blue-500': selectedImage === image }"
              @click="selectedImage = image"
            />
          </div>
        </div>
  
        <!-- Right Section: Product Details -->
        <div class="md:w-1/2 pl-4">
          <h2 class="text-2xl font-semibold">{{ product.name }}</h2>
          <hr class="my-2" />
          <p class="text-xl">
            <span v-if="product.offerPrice" class="text-gray-500 line-through">${{ product.originalPrice }}</span>
            <span class="text-red-500 ml-2">${{ product.offerPrice }}</span>
          </p>
          <p class="text-green-600 font-semibold">Discount: {{ discountPercentage }}%</p>
  
          <div class="mt-4">
            <ul class="list-disc pl-5">
              <li v-for="(detail, index) in product.details" :key="index">{{ detail }}</li>
            </ul>
          </div>
          <hr class="my-4" />
  
          <!-- Color Selection -->
          <p>Color: {{ selectedColor }}</p>
          <div class="flex gap-3 mt-2">
            <div
              v-for="color in product.colors"
              :key="color"
              :class="`w-8 h-8 rounded-full cursor-pointer border-2 ${color === selectedColor ? 'border-black' : ''}`"
              :style="{ backgroundColor: color }"
              @click="selectedColor = color"
            ></div>
          </div>
          <hr class="my-4" />
  
          <!-- Quantity and Add to Cart -->
          <div class="flex items-center gap-4">
            <button class="px-4 py-2 border border-gray-400 rounded bg-transparent flex items-center justify-center" @click="decreaseQuantity">-</button>
            <span class="text-lg">{{ quantity }}</span>
            <button class="px-4 py-2 border border-gray-400 rounded bg-transparent flex items-center justify-center" @click="increaseQuantity">+</button>
            <button class="flex-1 px-4 py-2 bg-blue-600 text-white rounded">Add to Cart</button>
          </div>
          <hr class="my-4" />
  
          <!-- Availability and Categories -->
          <div class="flex gap-4">
            <p class="font-semibold">Availability:</p>
            <p class="text-green-600">{{ product.availability }}</p>
          </div>
          <div class="flex gap-4 mt-2">
            <p class="font-semibold">Categories:</p>
            <p class="text-black">{{ product.category }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        product: {
          name: "Crompton Hill Breeze 1200 mm 3 Blade Ceiling Fan  (Brown | Pack of 1)",
          originalPrice: 2420,
          offerPrice: 1839,
          images: [
            "src/assets/product-10.png",
            "src/assets/product-b.png",
            "src/assets/product-a.png",
            "src/assets/product-c.png"
          ],
          details: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
          colors: ["Red", "Green", "Blue"],
          availability: "In Stock",
          category: "Fan",
        },
        selectedImage: "",
        selectedColor: "Red",
        quantity: 1,
      };
    },
    computed: {
      discountPercentage() {
        return (((this.product.originalPrice - this.product.offerPrice) / this.product.originalPrice) * 100).toFixed(0);
      },
    },
    methods: {
      increaseQuantity() {
        this.quantity++;
      },
      decreaseQuantity() {
        if (this.quantity > 1) this.quantity--;
      },
    },
    mounted() {
      this.selectedImage = this.product.images[0]; // Set first image as default
    }
  };
  </script>
  
  <style>
  @media (max-width: 768px) {
    .container {
      flex-direction: column;
    }
  }
  </style>
  