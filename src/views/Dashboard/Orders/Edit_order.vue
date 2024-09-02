<template>
    <dashboard-app/>
    <div class="all-content-wrapper mt-10">
      <div class="single-pro-review-area mt-t-30 mg-b-15">
        <div class="container-fluid">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="product-status-wrap drp-lst">
              <h4>Edit Order</h4>
              <div id="myTabContent" class="tab-content custom-product-edit">
                <div class="product-tab-list tab-pane fade active in" id="description">
                  <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div class="review-content-section">
                        <div class="row">
                          <div class="col-lg-6">
                            <div class="devit-card-custom">
                              <div class="form-group">
                                <label for="client">Client</label>
                                <select v-model="order.client_id" class="form-control" id="client">
                                  <option v-for="client in clients" :key="client.id" :value="client.id">
                                    {{ client.name }}
                                  </option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-6">
                            <div class="devit-card-custom">
                              <div class="form-group">
                                <label for="user">User</label>
                                <select v-model="order.user_id" class="form-control" id="user">
                                  <option v-for="user in users" :key="user.id" :value="user.id">
                                    {{ user.name }}
                                  </option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-6">
                            <div class="devit-card-custom">
                              <div class="form-group">
                                <input
                                  v-model="order.total_price"
                                  type="text"
                                  class="form-control"
                                  placeholder="Total Price"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-6">
                            <div class="devit-card-custom">
                              <div class="form-group">
                                <input
                                  v-model="order.status"
                                  type="text"
                                  class="form-control"
                                  placeholder="Status"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-lg-12">
                            <div class="payment-adress">
                              <button @click="updateOrder" class="btn waves-effect waves-light" style="background-color: #050724; color: white">
                                Edit Order
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
  name: 'EditOrder',
  components: {
    'dashboard-app': Dashboard,
    'footer-app': Footer,
  },
  data() {
    return {
      order: {
        id: '',
        client_id: '',
        user_id: '',
        total_price: '',
        status: ''
      },
      clients: [],
      users: []
    };
  },
  methods: {
    async fetchOrder() {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No token found');
        }
        const response = await axios.get(`http://localhost:8000/api/orders/${this.$route.params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.order = response.data;
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    },
    async fetchClients() {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No token found');
        }
        const response = await axios.get('http://localhost:8000/api/clients', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.clients = response.data;
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    },
    async fetchUsers() {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No token found');
        }
        const response = await axios.get('http://localhost:8000/api/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async updateOrder() {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No token found');
    }
    await axios.put(`http://localhost:8000/api/orders/${this.order.id}`, this.order, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    this.$router.push('/list-orders'); // Redirect after successful update
  } catch (error) {
    console.error('Error updating order:', error);
  }
}},
  created() {
    this.fetchOrder();
    this.fetchClients();
    this.fetchUsers();
  }
};
</script>
  