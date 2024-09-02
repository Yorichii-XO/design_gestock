<template>
  <div class="max-w-xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">Order Summary</h2>
    <p><strong>Product ID:</strong> {{ productId }}</p>
    <p><strong>Quantity:</strong> {{ quantity }}</p>
    <p><strong>Total Price:</strong> ${{ totalPrice }}</p>

    <form @submit.prevent="submitOrder">
      <div class="mb-4">
        <label for="clientName" class="block text-sm font-medium text-gray-700">Name</label>
        <input type="text" id="clientName" v-model="client.name" required class="mt-1 block w-full">
      </div>

      <div class="mb-4">
        <label for="clientEmail" class="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" id="clientEmail" v-model="client.email" required class="mt-1 block w-full">
      </div>

      <div class="mb-4">
        <label for="clientPhone" class="block text-sm font-medium text-gray-700">Phone</label>
        <input type="tel" id="clientPhone" v-model="client.phone" required class="mt-1 block w-full">
      </div>

      <div class="mb-4">
        <label for="clientAddress" class="block text-sm font-medium text-gray-700">Address</label>
        <input type="text" id="clientAddress" v-model="client.address" required class="mt-1 block w-full">
      </div>

      <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded">Place Order</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      productId: this.$route.query.productId,
      quantity: this.$route.query.quantity,
      totalPrice: this.$route.query.totalPrice,
      client: {
        name: '',
        email: '',
        phone: '',
        address: ''
      },
      baseUrl: 'http://localhost:8000', // Ensure this matches your server's base URL
    };
  },
  methods: {
  async submitOrder() {
  try {
    const token = localStorage.getItem('authToken');
    
    // Log token for debugging
    console.log('Auth Token:', token);

    if (!token) {
      console.error('Missing authentication token');
      alert('Missing authentication token');
      return;
    }

    // Fetch user details
    const userResponse = await axios.get(`${this.baseUrl}/api/users`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // Log the response for debugging
    console.log('User Response:', userResponse.data);

    // Assuming the response is an array and we need the first user
    const users = userResponse.data; // This should be an array of users
    if (!Array.isArray(users) || users.length === 0) {
      console.error('No users found in the response');
      alert('No users found in the response');
      return;
    }

    // Extract the user ID from the first user in the array
    const userId = users[0].id; // Adjust based on the actual structure
    console.log('User ID:', userId);

    if (!userId) {
      console.error('Missing user information');
      alert('Missing user information');
      return;
    }

    // Create the client
    const clientResponse = await axios.post(`${this.baseUrl}/api/clients`, this.client, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const clientId = clientResponse.data.id;

    // Place the order
    await axios.post(`${this.baseUrl}/api/orders`, {
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
    this.$router.push('/');
  } catch (error) {
    console.error('Error placing order:', error.response ? error.response.data : error.message);
    alert('Failed to place order. Please check the console for details.');
  }
}

}



};
</script>
