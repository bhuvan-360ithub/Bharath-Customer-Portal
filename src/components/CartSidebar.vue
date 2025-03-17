<template>
  <div
    class="fixed top-0 right-0 w-96 h-screen bg-white shadow-lg p-4 
           transform transition-transform duration-500 ease-in-out 
           translate-x-0 rounded-l-lg overflow-y-auto z-50"
  >
    <div class="flex justify-between items-center mb-2">
      <h2 class="text-lg font-bold">Shopping Cart</h2>
      <button @click="$emit('close')" class="p-2">
        <i class="pi pi-times"></i>
      </button>
    </div>
    <hr class="mb-3" />

    <div v-if="cart.length > 0">
      <div v-for="(item, index) in cart" :key="index">
        <div
          class="flex items-center justify-between p-3 rounded-lg"
        >
          <img :src="item.image" class="w-16 h-16 object-cover rounded-lg" alt="product" />
          <div class="flex-1 ml-3">
            <h3 class="text-lg font-semibold">{{ item.name }}</h3>
            <p class="text-md text-gray-600">₹ {{ item.price.toFixed(2) }}</p>
            <div class="flex items-center mt-2">
              <button @click="decreaseQty(index)" class="w-10 h-10 bg-white border border-gray-300 rounded flex items-center justify-center text-lg">-</button>
              <span class="w-12 text-center bg-gray-100 border border-gray-300 mx-2 py-1 rounded text-lg">{{ item.quantity }}</span>
              <button @click="increaseQty(index)" class="w-10 h-10 bg-white border border-gray-300 rounded flex items-center justify-center text-lg">+</button>
            </div>
          </div>
          <button @click="removeFromCart(index)" class="text-red-500">
            <i class="pi pi-trash"></i>
          </button>
        </div>
        <hr v-if="index < cart.length - 1" class="my-3" />
      </div>
    </div>
    <p v-else class="text-center text-gray-500">Your cart is empty.</p>

    <div v-if="cart.length > 0" class="bg-gray-100 p-4 mt-4 rounded-lg">
      <div class="flex justify-between">
        <span class="text-lg font-bold">Total:</span>
        <span class="text-lg font-bold">₹ {{ totalPrice.toFixed(2) }}</span>
      </div>
      <button class="w-full mt-3 bg-blue-600 text-white py-2 rounded">View Cart</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
  return {
    cart: [
      { name: 'PHILIPS 7W B22 LED Bulb', price: 140, quantity: 1, image: '/assets/product-9.png' },
      { name: 'Ceiling Fan', price: 2449, quantity: 1, image: '/assets/fan.png' },
    ],
  };
},
  computed: {
    totalPrice() {
      return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
  },
  methods: {
    increaseQty(index) {
      this.cart[index].quantity++;
    },
    decreaseQty(index) {
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity--;
      }
    },
    removeFromCart(index) {
      this.cart.splice(index, 1);
    },
  },
};
</script>

<style>
button {
  cursor: pointer;
}
</style>
