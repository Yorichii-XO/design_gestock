<template>
    <dashboard-app />
    <div class="all-content-wrapper mt-10">
      <div class="single-pro-review-area mt-t-30 mg-b-15">
        <div class="container-fluid">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="product-status-wrap drp-lst">
              <h4>Add Client</h4>
              <div class="product-payment-inner-st">
                <div id="myTabContent" class="tab-content custom-product-edit">
                  <div class="product-tab-list tab-pane fade active in" id="description">
                    <div class="row">
                      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="review-content-section">
                          <form @submit.prevent="submitClient">
                            <!-- Bind input fields to data properties -->
                            <div class="row">
                              <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div class="form-group">
                                  <input v-model="clientName" type="text" class="form-control" placeholder="Client Name">
                                </div>
                              </div>
                              <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div class="form-group">
                                  <input v-model="clientEmail" type="email" class="form-control" placeholder="Client Email">
                                </div>
                              </div>
                              <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div class="form-group">
                                  <input v-model="clientPhone" type="text" class="form-control" placeholder="Client Phone">
                                </div>
                              </div>
                              <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div class="form-group">
                                  <input v-model="clientAddress" type="text" class="form-control" placeholder="Client Address">
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-lg-12">
                                <div class="payment-adress">
                                  <button type="submit" class="btn waves-effect waves-light" style="background-color: #050724; color: white">Add Client</button>
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
      <footer-app />
    </div>
  </template>
<script>
import Dashboard from '../Dashboard.vue';
import Footer from '../Footer.vue';
import axios from 'axios'; // Make sure to import axios for API requests

export default {
  name: 'add-client',
  components: {
    'dashboard-app': Dashboard,
    'footer-app': Footer,
  },
  data() {
    return {
      clientName: '', // Data property for client name
      clientEmail: '', // Data property for client email
      clientPhone: '', // Data property for client phone
      clientAddress: '', // Data property for client address
      authToken: '', // Data property to store the authentication token
    };
  },
  mounted() {
    // Retrieve the auth token from localStorage or a similar secure storage
    this.authToken = localStorage.getItem('authToken'); // Adjust the key based on your actual storage method
  },
  methods: {
    // Method to handle form submission
    submitClient() {
      const postData = {
        name: this.clientName,
        email: this.clientEmail,
        phone: this.clientPhone,
        address: this.clientAddress,
      };

      // Configure the Axios request to include the authentication token in the headers
      axios.post('http://localhost:8000/api/clients', postData, {
        headers: {
          'Authorization': `Bearer ${this.authToken}`, // Add Bearer token to headers
          'Content-Type': 'application/json',
        }
      })
        .then(response => {
          console.log('Client added successfully:', response.data);
          // You can add more logic here, such as redirecting or showing a success message
          this.clientName = '';
          this.clientEmail = '';
          this.clientPhone = '';
          this.clientAddress = '';
          this.$router.push('/list_clients');

        })
        .catch(error => {
          console.error('Error adding client:', error);
          // Handle error, for example, show an error message to the user
        });
    },
  },
};
</script>
  