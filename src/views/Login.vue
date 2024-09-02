<template>
  <div class="header_section">
    <div class="container">
      <div class="flex justify-center items-center min-h-screen bg-gray-100">
        <div class="w-full max-w-sm p-8 bg-white shadow-lg rounded-lg">
          <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
          <form @submit.prevent="login">
            <div class="mb-4">
              <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
              <input
                type="email"
                v-model="email"
                required
                class="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div class="mb-4">
              <label for="password" class="block text-sm font-medium text-gray-700">Password:</label>
              <input
                type="password"
                v-model="password"
                required
                class="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              class="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
            <div v-if="errorMessage" class="mt-4 text-red-500 text-center">{{ errorMessage }}</div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router'; // Import useRouter

export default {
  name: 'Login-app',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '' // To store error messages
    };
  },
  setup() {
    const router = useRouter(); // Use useRouter to access the router instance
    return { router };
  },
  methods: {
    async login() {
      try {
        // Make the API call to login
        const response = await axios.post('http://localhost:8000/api/login', {
          email: this.email,
          password: this.password
        });

        // Extract the token and role from the response
        const { token, role } = response.data; // Ensure this matches your API response

        // Store token and role in localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('role', role);

        // Handle successful login
        console.log('Login successful', role);

        // Redirect based on user role
        if (role === 'admin') {
          this.router.push('/dashboard');
        } else {
          this.router.push('/'); // Redirect to home or other page for non-admin users
        }
      } catch (error) {
        console.error('Login error:', error);
        this.errorMessage = 'Invalid email or password'; // Display error message
      }
    }
  }
};
</script>

<style scoped>
/* Add any additional scoped styles if needed */
</style>
