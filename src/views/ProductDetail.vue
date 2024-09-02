<template>
  <div class="w-full mx-auto px-4 sm:px-6 lg:px-0 mt-20">
    <div v-if="product && category" class="grid grid-cols-1 lg:grid-cols-2 gap-16 mx-auto max-md:px-2">
      <div class="img">
        <div class="img-box h-full max-lg:mx-auto">
          <img :src="imageUrl" alt="Product Image" class="max-lg:mx-auto lg:ml-auto h-full">
        </div>
      </div>
      <div class="data w-full max-w-xl">
        <p class="text-lg font-medium leading-8 text-indigo-600 mb-4">
          <router-link to="/">Products</router-link>&nbsp; /&nbsp; {{ category.name }}
        </p>
        <h2 class="font-manrope font-bold text-3xl leading-10 text-gray-900 mb-2 capitalize">
          {{ product.name }}
        </h2>
        <div class="flex flex-col sm:flex-row sm:items-center mb-6">
          <h6 class="font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5">
            $ {{ product.price }}
          </h6>
        </div>
        <p class="text-gray-500 text-base font-normal mb-5">
          Quantity: {{ product.quantity }}
        </p>
        <form @submit.prevent="placeOrder">
          <div>
            <label for="quantity">Select Quantity:</label>
            <input type="number" v-model="orderQuantity" min="1" :max="product.quantity" required>
          </div>
          <button type="submit" class="mt-4 btn btn-primary">Order</button>
        </form>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProductDetail-app',
  data() {
    return {
      product: null,
      category: null,
      orderQuantity: 1,
      baseUrl: 'http://localhost:8000', // Ensure this matches your server's base URL
    };
  },
  computed: {
    imageUrl() {
      // Construct the image URL
      const url = `${this.baseUrl}/${this.product?.image || ''}`;
      console.log('Constructed Image URL:', url); // Debugging
      return url;
    }
  },
  methods: {
    async fetchProduct() {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No token found');
        }

        const productResponse = await axios.get(`${this.baseUrl}/api/products/${this.$route.params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.product = productResponse.data;

        const inventoryResponse = await axios.get(`${this.baseUrl}/api/inventories/${this.$route.params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.product.quantity = inventoryResponse.data.quantity;

        const categoryResponse = await axios.get(`${this.baseUrl}/api/categories/${this.product?.category_id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.category = categoryResponse.data;

      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    },
    placeOrder() {
      // Handle order placement
      console.log(`Order placed for ${this.product?.name} with quantity ${this.orderQuantity}`);
      // Implement actual order logic here
    }
  },
  created() {
    this.fetchProduct();
  }
};
</script>
