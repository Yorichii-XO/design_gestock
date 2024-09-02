<template>
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        All Categories
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <!-- Loop through categories and display them -->
        <a class="dropdown-item" v-for="category in categories" :key="category.id" href="#">
          {{ category.name }}
        </a>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'CategoriesApp',
    data() {
      return {
        categories: []
      };
    },
    mounted() {
      this.fetchCategories();
    },
    methods: {
      async fetchCategories() {
  try {
    const token = localStorage.getItem('authToken');
    console.log('Token:', token); // Debugging line

    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get('http://localhost:8000/api/categories', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log(response.data); // Log the data to see if it's correct
    this.categories = response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized: Check your token and authentication.');
    }
  }
}


}

  };
  </script>
  
  <style scoped>
  /* Optional: Add any additional styling here */
  </style>
  