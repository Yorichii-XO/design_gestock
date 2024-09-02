<template>
    <dashboard-app/>
    <div class="all-content-wrapper mt-10">
      <div class="single-pro-review-area mt-t-30 mg-b-15">
        <div class="container-fluid">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="product-status-wrap drp-lst">
              <h4>Categories List</h4>
              <div class="add-product">
                <router-link to="/add-category" style=" background-color: #050724;color:white">Add Category</router-link>
              </div>
              <div class="asset-inner">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name of Category</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="category in categories" :key="category.id">
                      <td>{{ category.id }}</td>
                      <td>{{ category.name }}</td>
                      <td>{{ category.description }}</td>
                      <td>
                        <router-link :to="{ name: 'EditCategory', params: { id: category.id } }" data-toggle="tooltip" title="Edit" class="pd-setting-ed">
                          <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                        </router-link>
                        <button @click="deleteCategory(category.id)" data-toggle="tooltip" title="Trash" class="pd-setting-ed">
                          <i class="fa fa-trash-o" aria-hidden="true"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <center>
                <div class="custom-pagination text-center">
                  <nav aria-label="Page navigation example">
                    <ul class="pagination">
                      <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                      <li class="page-item"><a class="page-link" href="#">1</a></li>
                      <li class="page-item"><a class="page-link" href="#">2</a></li>
                      <li class="page-item"><a class="page-link" href="#">3</a></li>
                      <li class="page-item"><a class="page-link" href="#">Next</a></li>
                    </ul>
                  </nav>
                </div>
              </center>
            </div>
          </div>
        </div>
      </div>
      <footer-app/>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Dashboard from '../Dashboard.vue';
  import Footer from '../Footer.vue';
  
  export default {
    name: 'categories-list',
    components: {
      'dashboard-app': Dashboard,
      'footer-app': Footer,
    },
    data() {
      return {
        categories: [] // Holds the list of categories
      };
    },
    methods: {
      async fetchCategories() {
        try {
          const token = localStorage.getItem('authToken');
          if (!token) {
            throw new Error('No token found');
          }
          const response = await axios.get('http://localhost:8000/api/categories', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          this.categories = response.data;
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      },
      async deleteCategory(id) {
        try {
          const token = localStorage.getItem('authToken');
          if (!token) {
            throw new Error('No token found');
          }
          await axios.delete(`http://localhost:8000/api/categories/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          // Refresh the category list
          this.fetchCategories();
        } catch (error) {
          console.error('Error deleting category:', error);
        }
      }
    },
    created() {
      this.fetchCategories();
    }
  };
  </script>
  
  <style scoped>
  /* Add any component-specific styles here */
  </style>
  