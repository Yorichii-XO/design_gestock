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
  </div> </div></div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:8000/api/login', {
          email: this.email,
          password: this.password
        });

        if (response && response.data) {
          localStorage.setItem('auth_token', response.data.token);
          this.$router.push('/');
        } else {
          this.errorMessage = 'Invalid response from the server';
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          this.errorMessage = error.response.data.message;
        } else {
          this.errorMessage = 'An error occurred during login';
        }
        console.error('Login failed:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Add any additional scoped styles if needed */
</style>
