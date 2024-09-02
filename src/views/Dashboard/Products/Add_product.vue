<template>
    <dashboard-app/>
    <div class="all-content-wrapper mt-10">
      <div class="single-pro-review-area mt-t-30 mg-b-15">
        <div class="container-fluid">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="product-status-wrap drp-lst">
              <h4>Add Product</h4>
              <div class="product-payment-inner-st">
                <div id="myTabContent" class="tab-content custom-product-edit">
                  <div class="product-tab-list tab-pane fade active in" id="description">
                    <div class="row">
                      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="review-content-section">
                          <form @submit.prevent="submitProduct">
                            <!-- Product Name and Price -->
                            <div class="row">
                              <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div class="form-group">
                                  <input v-model="productName" type="text" class="form-control" placeholder="Name of Product">
                                </div>
                              </div>
                              <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div class="form-group">
                                  <input v-model="productPrice" type="number" class="form-control" placeholder="Price">
                                </div>
                              </div>
                            </div>
                            <!-- Category and Supplier Select -->
                            <div class="row">
                              <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div class="form-group">
                                  <select v-model="categoryId" class="form-control">
                                    <option value="" disabled selected>Select Category</option>
                                    <option v-for="category in categories" :key="category.id" :value="category.id">
                                      {{ category.name }}
                                    </option>
                                  </select>
                                </div>
                              </div>
                              <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div class="form-group">
                                  <select v-model="supplierId" class="form-control">
                                    <option value="" disabled selected>Select Supplier</option>
                                    <option v-for="supplier in suppliers" :key="supplier.id" :value="supplier.id">
                                      {{ supplier.name }}
                                    </option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <!-- Image Upload -->
                            <div class="row">
                              <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div class="form-group">
                                  <input type="file" @change="onFileChange" class="form-control">
                                </div>
                              </div>
                            </div>
                            <!-- Submit Button -->
                            <div class="row">
                              <div class="col-lg-12">
                                <div class="payment-adress">
                                  <button type="submit" class="btn waves-effect waves-light" style="background-color: #050724; color: white;">
                                    Add Product
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Other tabs here... -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer-app/>
  </template>
<script>
import Dashboard from '../Dashboard.vue';
import Footer from '../Footer.vue';
import axios from 'axios'; // Make sure to import axios for API requests

export default {
  name: 'add-product',
  components: {
    'dashboard-app': Dashboard,
    'footer-app': Footer,
  },
  data() {
    return {
      productName: '',
      productPrice: '',
      categoryId: '',
      supplierId: '',
      categories: [],
      suppliers: [],
      authToken: '',
      productImage: null, // New property to store the image file
    };
  },
  mounted() {
    this.authToken = localStorage.getItem('authToken'); // Adjust the key based on your actual storage method
    this.fetchCategories();
    this.fetchSuppliers();
  },
  methods: {
    fetchCategories() {
      axios.get('http://localhost:8000/api/categories', {
        headers: {
          'Authorization': `Bearer ${this.authToken}`,
        }
      })
      .then(response => {
        this.categories = response.data;
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
    },

    fetchSuppliers() {
      axios.get('http://localhost:8000/api/suppliers', {
        headers: {
          'Authorization': `Bearer ${this.authToken}`,
        }
      })
      .then(response => {
        this.suppliers = response.data;
      })
      .catch(error => {
        console.error('Error fetching suppliers:', error);
      });
    },

    onFileChange(event) {
      this.productImage = event.target.files[0]; // Store the selected file
    },

    submitProduct() {
      const formData = new FormData();
      formData.append('name', this.productName);
      formData.append('price', this.productPrice);
      formData.append('category_id', this.categoryId);
      formData.append('supplier_id', this.supplierId);
      formData.append('image', this.productImage); // Add the image to the form data

      axios.post('http://localhost:8000/api/products', formData, {
        headers: {
          'Authorization': `Bearer ${this.authToken}`, // Add Bearer token to headers
          'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
        }
      })
      .then(response => {
        console.log('Product added successfully:', response.data);
        this.productName = '';
        this.productPrice = '';
        this.categoryId = '';
        this.supplierId = '';
        this.productImage = null; // Clear the file input after successful submission
      })
      .catch(error => {
        console.error('Error adding product:', error);
        // Handle error, for example, show an error message to the user
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
        } else if (error.request) {
          console.error('Request data:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
      });
    },
  },
};
</script>
  