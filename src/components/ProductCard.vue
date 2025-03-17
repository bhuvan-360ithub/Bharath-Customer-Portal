<template>
  <div class="product-card relative overflow-hidden rounded-lg p-4 transition-transform duration-300">
    <div class="relative overflow-hidden rounded-lg bg-[#f2f2f2] h-80 flex items-center justify-center">
      <div v-if="offer" class="absolute top-3 left-3 bg-white text-red-500 text-sm font-bold px-4 py-1 rounded-lg border border-red-500">
        -{{ offer }}%
      </div>

      <img :src="image" alt="Product Image" class="object-cover max-h-full transition-transform duration-300" />

      <!-- Quick View Button -->
      <button 
        class="eye-btn absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center transition-opacity"
        @click.stop="openQuickView">
        <i class="pi pi-eye"></i>
      </button>

      <button 
        class="add-to-cart-btn absolute bottom-4 left-2 right-2 bg-blue-500 text-white py-2 px-4 rounded-lg transition-transform duration-300 hover:bg-blue-600"
        @click.stop="$emit('add-to-cart')">
        Add to Cart
      </button>
    </div>

    <!-- Product Name with Router-Link -->
    <router-link 
      :to="{ 
        path: '/productdetails', 
        query: { 
          name, 
          price, 
          offer, 
          image, 
          details, 
          colors 
        } 
      }"
      class="mt-4 text-lg font-semibold text-left hover:text-blue-500 cursor-pointer transition-colors block"
    >
      {{ name }}
    </router-link>

    <p class="text-left text-gray-700 font-medium">
      <span v-if="offer" class="line-through text-gray-500">₹{{ price }}</span>
      <span v-if="offer" class="ml-2 text-gray-700 font-bold">₹{{ discountedPrice }}</span>
      <span v-else class="text-gray-700 font-bold">₹{{ price }}</span>
    </p>

    <!-- Quick View Popup -->
    <QuickViewPopup 
      v-if="isQuickViewOpen" 
      :product="{ image, name, price, offer, details, colors }"
      @close="isQuickViewOpen = false"
      @add-to-cart="$emit('add-to-cart')"
    />
  </div>
</template>

<script>
import QuickViewPopup from './QuickViewPopup.vue';

export default {
  components: { QuickViewPopup },
  props: ['image', 'name', 'price', 'offer', 'details', 'colors'],
  data() {
    return {
      isQuickViewOpen: false,
    };
  },
  computed: {
    discountedPrice() {
      return this.offer ? (this.price - (this.price * this.offer) / 100).toFixed(2) : this.price;
    }
  },
  methods: {
    openQuickView() {
      console.log("Opening Quick View Popup"); // Debugging
      this.isQuickViewOpen = true;
      console.log("isQuickViewOpen:", this.isQuickViewOpen); // Debugging
    }
  }
};
</script>

<style scoped>
.eye-btn,
.add-to-cart-btn {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}

@media (min-width: 1024px) {
  .eye-btn,
  .add-to-cart-btn {
    opacity: 0;
    transform: translateY(100%);
  }

  .product-card:hover .eye-btn,
  .product-card:hover .add-to-cart-btn {
    opacity: 1;
    transform: translateY(0);
  }

  .product-card:hover img {
    transform: scale(1.1);
  }
}
</style>
