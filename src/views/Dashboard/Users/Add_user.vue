<template>
    <dashboard-app/>
    <div class="all-content-wrapper mt-10">
      <div class="single-pro-review-area mt-t-30 mg-b-15">
        <div class="container-fluid">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="product-status-wrap drp-lst">
              <h4>Add User</h4>
              <div class="product-payment-inner-st">
                <div id="myTabContent" class="tab-content custom-product-edit">
                  <div class="product-tab-list tab-pane fade active in" id="description">
                    <div class="row">
                      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="review-content-section">
                          <form @submit.prevent="submitUser">
                            <!-- Bind input fields to data properties -->
                            <div class="row">
                              <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div class="form-group">
                                  <input v-model="userName" type="text" class="form-control" placeholder="Name">
                                </div>
                              </div>
                              <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div class="form-group">
                                  <input v-model="userEmail" type="email" class="form-control" placeholder="Email">
                                </div>
                              </div>
                              <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div class="form-group">
                                  <input v-model="userPassword" type="password" class="form-control" placeholder="Password">
                                </div>
                              </div>
                              <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div class="form-group">
                                  <input v-model="userRole" type="text" class="form-control" placeholder="Role">
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-lg-12">
                                <div class="payment-adress">
                                  <button type="submit" class="btn waves-effect waves-light" style="background-color: #050724; color: white">Add User</button>
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
import axios from 'axios';
import Dashboard from '../Dashboard.vue';
import Footer from '../Footer.vue';

export default {
  name: 'add-user',
  components: {
    'dashboard-app': Dashboard,
    'footer-app': Footer,
  },
  data() {
    return {
      userName: '', // Data property for user name
      userEmail: '', // Data property for user email
      userPassword: '', // Data property for user password
      userRole: '', // Data property for user role
      authToken: '', // Data property to store the authentication token
    };
  },
  mounted() {
    // Retrieve the auth token from localStorage or a similar secure storage
    this.authToken = localStorage.getItem('authToken'); // Adjust the key based on your actual storage method
  },
  methods: {
    // Method to handle form submission
    submitUser() {
      const postData = {
        name: this.userName,
        email: this.userEmail,
        password: this.userPassword,
        role: this.userRole,
      };

      // Configure the Axios request to include the authentication token in the headers
      axios.post('http://localhost:8000/api/users', postData, {
        headers: {
          'Authorization': `Bearer ${this.authToken}`, // Add Bearer token to headers
          'Content-Type': 'application/json',
        }
      })
        .then(response => {
          console.log('User added successfully:', response.data);
          // You can add more logic here, such as clearing the form or showing a success message
          this.userName = '';
          this.userEmail = '';
          this.userPassword = '';
          this.userRole = '';
          this.$router.push('/list-users'); // Redirect to the list of users
        })
        .catch(error => {
          console.error('Error adding user:', error);
          // Handle error, for example, show an error message to the user
        });
    },
  },
};
</script>
  