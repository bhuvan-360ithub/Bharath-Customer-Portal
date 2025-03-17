<template>
    <div class="p-4 relative">
      <h1 class="text-xl font-bold mb-4">Products</h1>
      <FilterBar :totalProducts="totalProducts" @toggleFilter="toggleFilter" />
  
      <!-- Black Overlay for Modals -->
      <div 
        v-if="isFilterOpen || isCartOpen || isQuickViewOpen" 
        class="fixed inset-0 bg-black bg-opacity-50 z-50"
        @click="closeOverlays"
      ></div>
  
      <!-- Filter Sidebar -->
      <transition name="slide-in">
        <SidebarFilter v-if="isFilterOpen" @close="toggleFilter" class="fixed top-0 left-0 w-80 h-full z-50 bg-white shadow-lg" />
      </transition>
  
      <!-- Products Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        <ProductCard 
          v-for="product in paginatedProducts" 
          :key="product.id" 
          :image="product.image" 
          :name="product.name" 
          :price="product.price" 
          :offer="product.offer"
          :details="product.details"
          :colors="product.colors"
          @quick-view="openQuickView" 
          @add-to-cart="toggleCart"
        />
      </div>
  
      <!-- Quick View Popup -->
      <QuickViewPopup 
        v-if="isQuickViewOpen" 
        :product="selectedProduct"
        @close="isQuickViewOpen = false"
        @add-to-cart="toggleCart"
      />
  
      <!-- Cart Sidebar -->
      <transition name="slide-right">
        <CartSidebar v-if="isCartOpen" @close="toggleCart" class="fixed top-0 right-0 w-80 h-full z-50 bg-white shadow-lg" />
      </transition>
    </div>
  </template>
  
  <script>
  import FilterBar from "../components/FilterBar.vue";
  import SidebarFilter from "../components/SidebarFilter.vue";
  import ProductCard from "../components/ProductCard.vue";
  import QuickViewPopup from "../components/QuickViewPopup.vue";
  import CartSidebar from "../components/CartSidebar.vue";
  
  export default {
    components: { FilterBar, SidebarFilter, ProductCard, QuickViewPopup, CartSidebar },
    data() {
      return {
        isFilterOpen: false,
        isCartOpen: false,
        isQuickViewOpen: false,
        selectedProduct: null,
        products: [
          { id: 1, image: "src/assets/Ceiling-Fan.png", name: "Ceiling Fans", price: 2449, offer: 0, details: ["Air Circulation", "Quiet Operation"], colors: ["Blue", "White"] },
          { id: 2, image: "src/assets/product-1.png", name: "63 A TPN C MCB EURO 2", price: 1360, offer: 12, details: ["63 ampere rating", "TPN circuit breaker", "EURO standard size"], colors: ["Red", "Black", "White"] },
          { id: 3, image: "src/assets/product-2.png", name: "6 A SP B MCB EURO 2", price: 1200, offer: 0, details: ["6 Ampere rating", "Single Pole breaker"], colors: ["Blue", "White"] },
          { id: 4, image: "src/assets/product-3.png", name: "ACCL TPN/TPN -40A/40A", price: 15074, offer: 8, details: ["40 Amp Rating", "Automatic Changeover", "Three Pole Neutral (TPN)"], colors: ["Blue", "White"] },
          { id: 5, image: "src/assets/product-4.png", name: "Ecostar 4+1 Surge & Spikeguard (2 m) 6A", price: 500, offer: 0, details: ["Surge protection", "Spike protection", "6A capacity"], colors: ["Blue", "White"] },
          { id: 6, image: "src/assets/product-5.png", name: "Ecostar 4+1 Surge & Spikeguard (4 m) 6A ", price: 649, offer: 0, details: ["Surge protection", "Spike protection", "6A capacity"], colors: ["Blue", "White"] },
          { id: 7, image: "src/assets/product-6.png", name: "Schneider 10kA MCB", price: 430, offer: 60, details: ["Thermal Magnetic Trip", "10kA Trip Class", "IEC Standard Compliance", "High Breaking Capacity"], colors: ["Blue", "White"] },
          { id: 8, image: "src/assets/product-7.png", name: "2 Inch Wood Gatta", price: 299, offer: 0, details: ["Strong structural support", "Consistent dimensions", "Natural Wood Grain"], colors: ["Blue", "White"] },
          { id: 9, image: "src/assets/product-8.png", name: "Electric Switch Board", price: 1517, offer: 0, details: ["Controls power flow", "Distributes electrical circuits"], colors: ["Blue", "White"] },
          { id: 10, image: "src/assets/product-9.png", name: "PHILIPS 7W B22 LED Bulb", price: 140, offer: 22, details: ["High Efficiency", "Instant On", "Long Life"], colors: ["Blue", "White"] },
          { id: 11, image: "src/assets/product-11.png", name: "Gi Earthing Rods", price: 1831, offer: 0, details: ["Conductive grounding path", "Durable corrosion resistance", "Reliable electrical grounding"], colors: ["Blue", "White"] },
          { id: 12, image: "src/assets/product-12.png", name: "Uno Minda 850031 Relay", price: 244, offer: 0, details: ["12V/30A Rating", "5-Pin Design", "Universal Compatibility"], colors: ["Blue", "White"] },
        ],
        currentPage: 1,
        itemsPerPage: 12,
      };
    },
    computed: {
      totalProducts() {
        return this.products.length;
      },
      paginatedProducts() {
        return this.products.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
      },
    },
    methods: {
      toggleFilter() {
        this.isFilterOpen = !this.isFilterOpen;
      },
      toggleCart() {
        this.isCartOpen = !this.isCartOpen;
      },
      openQuickView(product) {
        console.log("Quick View Opened for:", product);
        this.selectedProduct = product;
        this.isQuickViewOpen = true;
      },
      closeOverlays() {
        this.isFilterOpen = false;
        this.isCartOpen = false;
        this.isQuickViewOpen = false;
      },
    },
  };
  </script>
  