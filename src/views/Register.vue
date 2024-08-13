<template>
   <div class="header_section">
    <div class="container">
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
      <div class="w-full max-w-sm p-8 bg-white shadow-lg rounded-lg">
        <h2 class="text-2xl font-bold mb-6 text-center">Register</h2>
        <form @submit.prevent="register">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              v-model="name"
              required
              class="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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
          <div class="mb-4">
            <label for="role" class="block text-sm font-medium text-gray-700">Role:</label>
            <input
              type="text"
              v-model="role"
              class="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            class="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
          <div v-if="errorMessage" class="mt-4 text-red-500 text-center">{{ errorMessage }}</div>
          <div v-if="successMessage" class="mt-4 text-green-500 text-center">{{ successMessage }}</div>
        </form>
      </div>
    </div>
    </div>
   </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'RegisterView',
    data() {
      return {
        name: '',
        email: '',
        password: '',
        role: '',
        errorMessage: '',
        successMessage: '',
      };
    },
    methods: {
      async register() {
        try {
          const response = await axios.post('http://localhost:8000/api/register', {
            name: this.name,
            email: this.email,
            password: this.password,
            role: this.role
          });
  
          if (response && response.data) {
            this.successMessage = response.data.message;
            this.errorMessage = '';
            this.$router.push('/login');
          } else {
            this.errorMessage = 'Invalid response from the server';
          }
        } catch (error) {
          if (error.response && error.response.data && error.response.data.message) {
            this.errorMessage = error.response.data.message;
          } else {
            this.errorMessage = 'An error occurred during registration';
          }
          console.error('Registration failed:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add any additional scoped styles if needed */
  </style>
  