<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg p-6 w-full max-w-2xl md:max-w-3xl relative flex flex-col md:flex-row">
      <button class="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl" @click="closeModal">
        &#x2715;
      </button>

      <div class="relative w-full md:w-1/2 p-4">
        <img :src="product.image" alt="Product Image" class="w-full h-76 md:h-80 object-cover rounded-md" />

        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          <span v-for="(dot, index) in 5" :key="index"
            class="h-3 w-3 rounded-full bg-gray-400 cursor-pointer transition-all duration-200"
            :class="{ 'w-6 rounded-lg bg-gray-900': index === activeDot }"
            @click="activeDot = index">
          </span>
        </div>
      </div>

      <div class="w-full md:w-1/2 p-4 flex flex-col">
        <h2 class="text-xl font-bold">{{ product.name }}</h2>
        <hr class="my-2" />

        <p class="text-lg font-semibold">
          <span v-if="product.offer" class="text-gray-500 line-through">₹{{ product.price }}</span>
          <span v-if="product.offer" class="ml-2 text-red-500">₹{{ discountedPrice }}</span>
          <span v-else>₹{{ product.price }}</span>
        </p>

        <ul class="mt-2 space-y-1">
          <li v-for="(point, index) in product.details" :key="index" class="flex items-start">
            <span class="text-blue-500 mr-2">•</span> {{ point }}
          </li>
        </ul>

        <hr class="my-2" />

        <p class="text-gray-500">Selected Color: <span class="font-semibold text-gray-700">{{ getColorName(selectedColor) }}</span></p>
        <div class="flex space-x-3 mt-2">
          <div v-for="(color, index) in product.colors" :key="index"
            class="relative w-12 h-12 flex items-center justify-center cursor-pointer rounded-full"
            @click="selectedColor = color">
            <div class="w-6 h-6 rounded-full" :style="{ backgroundColor: color }"></div>
            <div v-if="selectedColor === color"
              class="absolute inset-0 rounded-full border-2"
              :style="{ borderColor: color }">
            </div>
          </div>
        </div>

        <div class="flex items-center mt-4 space-x-4">
          <div class="flex items-center border rounded-lg overflow-hidden">
            <button class="px-4 py-2 text-lg bg-gray-200" @click="decreaseQuantity">-</button>
            <span class="px-6 text-lg">{{ quantity }}</span>
            <button class="px-4 py-2 text-lg bg-gray-200" @click="increaseQuantity">+</button>
          </div>
          <button class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex-1"
            @click="handleAddToCart">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product'],
  data() {
    return {
      activeDot: 0,
      selectedColor: this.product.colors[0],
      quantity: 1,
    };
  },
  computed: {
    discountedPrice() {
      return this.product.offer ? (this.product.price - (this.product.price * this.product.offer) / 100).toFixed(2) : this.product.price;
    }
  },
  methods: {
    increaseQuantity() {
      this.quantity++;
    },
    decreaseQuantity() {
      if (this.quantity > 1) this.quantity--;
    },
    handleAddToCart() {
      this.$emit('add-to-cart');
      this.closeModal();
      this.$emit('open-sidebar');
    },
    getColorName(color) {
      const colorNames = {
        "#0000FF": "Blue",
        "#FF0000": "Red",
        "#008000": "Green",
        "#FFFF00": "Yellow",
        "#000000": "Black",
        "#FFFFFF": "White",
      };
      return colorNames[color] || color;
    },
    closeModal() {
      this.$emit('close');
      document.body.style.overflow = '';
    }
  },
  mounted() {
    document.body.style.overflow = 'hidden';
  },
  beforeDestroy() {
    document.body.style.overflow = '';
  }
};
</script>