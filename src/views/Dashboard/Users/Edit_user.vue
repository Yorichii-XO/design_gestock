<template>
    <dashboard-app/>
    <div class="all-content-wrapper mt-10">
      <div class="single-pro-review-area mt-t-30 mg-b-15">
        <div class="container-fluid">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="product-status-wrap drp-lst">
              <h4>Edit User</h4>
              <div id="myTabContent" class="tab-content custom-product-edit">
                <div class="product-tab-list tab-pane fade active in" id="description">
                  <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div class="review-content-section">
                        <div class="row">
                          <div class="col-lg-6">
                            <div class="devit-card-custom">
                              <div class="form-group">
                                <input
                                  v-model="user.name"
                                  type="text"
                                  class="form-control"
                                  placeholder="Name"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-6">
                            <div class="devit-card-custom">
                              <div class="form-group">
                                <input
                                  v-model="user.email"
                                  type="email"
                                  class="form-control"
                                  placeholder="Email"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-6">
                            <div class="devit-card-custom">
                              <div class="form-group">
                                <input
                                  v-model="user.password"
                                  type="password"
                                  class="form-control"
                                  placeholder="Password"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-6">
                            <div class="devit-card-custom">
                              <div class="form-group">
                                <input
                                  v-model="user.role"
                                  type="text"
                                  class="form-control"
                                  placeholder="Role"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-lg-12">
                            <div class="payment-adress">
                              <button @click="updateUser" class="btn waves-effect waves-light" style="background-color: #050724; color: white">
                                Edit User
                              </button>
                            </div>
                          </div>
                        </div>
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
      <footer-app/>
    </div>
  </template>
<script>
import axios from 'axios';
import Dashboard from '../Dashboard.vue';
import Footer from '../Footer.vue';

export default {
  name: 'EditUser-app',
  components: {
    'dashboard-app': Dashboard,
    'footer-app': Footer,
  },
  data() {
    return {
      user: {
        id: '',
        name: '',
        email: '',
        password: '',
        role: ''
      }
    };
  },
  methods: {
    async fetchUser() {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No token found');
        }
        const response = await axios.get(`http://localhost:8000/api/users/${this.$route.params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.user = response.data;
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    },
    async updateUser() {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No token found');
        }
        await axios.put(`http://localhost:8000/api/users/${this.user.id}`, this.user, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.$router.push('/list-users'); // Redirect after successful update
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  },
  created() {
    this.fetchUser();
  }
};
</script>
  