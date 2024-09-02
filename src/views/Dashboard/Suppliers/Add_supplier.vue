<template>
    <dashboard-app/>
    <div class="all-content-wrapper mt-10">
      <div class="single-pro-review-area mt-t-30 mg-b-15">
        <div class="container-fluid">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="product-status-wrap drp-lst">
              <h4>Add Supplier</h4>
              <div class="product-payment-inner-st">
                <div id="myTabContent" class="tab-content custom-product-edit">
                  <div class="product-tab-list tab-pane fade active in" id="description">
                    <div class="row">
                      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="review-content-section">
                          <form @submit.prevent="submitSupplier">
                            <!-- Bind input fields to data properties -->
                            <div class="row">
                              <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div class="form-group">
                                  <input v-model="supplierName" type="text" class="form-control" placeholder="Name of Supplier" />
                                </div>
                              </div>
                              <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div class="form-group">
                                  <input v-model="supplierContactInfo" type="text" class="form-control" placeholder="Contact Info" />
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-lg-12">
                                <div class="payment-adress">
                                  <button type="submit" class="btn waves-effect waves-light" style="background-color: #050724; color: white">Add Supplier</button>
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
      <footer-app/>
    </div>
  </template>
<script>
import Dashboard from '../Dashboard.vue';
import Footer from '../Footer.vue';
import axios from 'axios'; // Import axios for API requests

export default {
  name: 'AddSupplier',
  components: {
    'dashboard-app': Dashboard,
    'footer-app': Footer,
  },
  data() {
    return {
      supplierName: '', // Data property for supplier name
      supplierContactInfo: '', // Data property for supplier contact info
      authToken: '', // Data property to store the authentication token
    };
  },
  mounted() {
    // Retrieve the auth token from localStorage or a similar secure storage
    this.authToken = localStorage.getItem('authToken'); // Adjust the key based on your actual storage method
  },
  methods: {
    // Method to handle form submission
    submitSupplier() {
      const postData = {
        name: this.supplierName,
        contact_info: this.supplierContactInfo,
      };

      // Configure the Axios request to include the authentication token in the headers
      axios.post('http://localhost:8000/api/suppliers', postData, {
        headers: {
          'Authorization': `Bearer ${this.authToken}`, // Add Bearer token to headers
          'Content-Type': 'application/json',
        }
      })
      .then(response => {
        console.log('Supplier added successfully:', response.data);
        // Clear the form or show a success message
        this.supplierName = '';
        this.supplierContactInfo = '';
      })
      .catch(error => {
        console.error('Error adding supplier:', error);
        // Handle error, for example, show an error message to the user
      });
    },
  },
};
</script>
  