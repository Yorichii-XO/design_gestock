<template>
    <div class="w-full mx-auto px-4 sm:px-6 lg:px-0 mt-20">
      <div class="max-w-xl mx-auto">
        <h2 class="text-2xl font-bold mb-4">Order Summary</h2>
        
        <!-- Debugging: Display product details -->
        <div v-if="productId && quantity && totalPrice">
          <p><strong>Product ID:</strong> {{ productId }}</p>
          <p><strong>Quantity:</strong> {{ quantity }}</p>
          <p><strong>Total Price:</strong> ${{ totalPrice }}</p>
        </div>
        
        <!-- Order form -->
        <form @submit.prevent="submitOrder">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
            <input id="name" v-model="client.name" type="text" required
                   class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          </div>
          
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input id="email" v-model="client.email" type="email" required
                   class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          </div>
          
          <div class="mb-4">
            <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
            <input id="phone" v-model="client.phone" type="tel" required
                   class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          </div>
          
          <div class="mb-4">
            <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
            <textarea id="address" v-model="client.address" required
                      class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
          </div>
          
          <button type="submit" class="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Place Order</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'OrderPage',
    data() {
      return {
        productId: this.$route.query.productId || '',
        quantity: this.$route.query.quantity || '',
        totalPrice: this.$route.query.totalPrice || '',
        client: {
          name: '',
          email: '',
          phone: '',
          address: ''
        },
        baseUrl: 'http://localhost:8000',
      };
    },
    methods: {
      async submitOrder() {
        try {
          const token = localStorage.getItem('authToken');
          const userId = localStorage.getItem('userId'); // Ensure userId is set in localStorage
          const clientId = localStorage.getItem('clientId'); // Ensure clientId is set in localStorage
          
          if (!token || !userId || !clientId) {
            throw new Error('Missing authentication or client information');
          }
  
          const response = await axios.post(`${this.baseUrl}/api/orders`, {
            client_id: clientId,
            user_id: userId,
            total_price: this.totalPrice,
            status: 'Pending',
            quantity: this.quantity,
            product_id: this.productId
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
  
          alert('Order placed successfully!');
          this.$router.push('/orders'); // Redirect to orders page or wherever you want
        } catch (error) {
          console.error('Error placing order:', error);
          alert('Failed to place order.');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add any custom styles here */
  </style>
  