<template>
  <dashboard-app/>
  <div class="all-content-wrapper mt-10">
   
   <div class="single-pro-review-area mt-t-30 mg-b-15">
     <div class="container-fluid">
         <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
           <div class="product-status-wrap drp-lst">
             <h4>Add Category</h4>
            <div class="product-payment-inner-st">
              <div id="myTabContent" class="tab-content custom-product-edit">
                <div class="product-tab-list tab-pane fade active in" id="description">
                  <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div class="review-content-section">
                        <form @submit.prevent="submitCategory">
                          <!-- Bind input fields to data properties -->
                          <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <div class="form-group">
                                <input v-model="categoryName" type="text" class="form-control" placeholder="Name of Category">
                              </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <div class="form-group">
                                <input v-model="categoryDescription" type="text" class="form-control" placeholder="Description">
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-lg-12">
                              <div class="payment-adress">
                                <button type="submit" class="btn  waves-effect waves-light" style=" background-color: #050724;color:white">Add Category</button>
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
  name: 'add-category',
  components: {
    'dashboard-app': Dashboard,
    'footer-app': Footer,

  },
  data() {
    return {
      categoryName: '', // Data property for category name
      categoryDescription: '', // Data property for category description
      authToken: '', // Data property to store the authentication token
    };
  },
  mounted() {
    // Retrieve the auth token from localStorage or a similar secure storage
    this.authToken = localStorage.getItem('authToken'); // Adjust the key based on your actual storage method
  },
  methods: {
    // Method to handle form submission
    submitCategory() {
      const postData = {
        name: this.categoryName,
        description: this.categoryDescription,
      };

      // Configure the Axios request to include the authentication token in the headers
      axios.post('http://localhost:8000/api/categories', postData, {
        headers: {
          'Authorization': `Bearer ${this.authToken}`, // Add Bearer token to headers
          'Content-Type': 'application/json',
        }
      })
        .then(response => {
          console.log('Category added successfully:', response.data);
          // You can add more logic here, such as clearing the form or showing a success message
          this.categoryName = '';
          this.categoryDescription = '';
        })
        .catch(error => {
          console.error('Error adding category:', error);
          // Handle error, for example, show an error message to the user
        });
    },
  },
};
</script>
