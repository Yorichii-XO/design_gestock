<template>
    <dashboard-app/>
    <div class="all-content-wrapper mt-10">
      <div class="single-pro-review-area mt-t-30 mg-b-15">
        <div class="container-fluid">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="product-status-wrap drp-lst">
              <h4>Orders List</h4>
              <div class="add-product">
                <router-link to="/add-order" style="background-color: #050724; color: white">Add Order</router-link>
              </div>
              <div class="asset-inner">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Client ID</th>
                      <th>User ID</th>
                      <th>Total Price</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="order in orders" :key="order.id">
                      <td>{{ order.id }}</td>
                      <td>{{ order.client_id }}</td>
                      <td>{{ order.user_id }}</td>
                      <td>{{ order.total_price }}</td>
                      <td>{{ order.status }}</td>
                      <td>
                        <router-link :to="{ name: 'EditOrder', params: { id: order.id } }" data-toggle="tooltip" title="Edit" class="pd-setting-ed">
                          <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                        </router-link>
                        <button @click="deleteOrder(order.id)" data-toggle="tooltip" title="Trash" class="pd-setting-ed">
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
  name: 'OrdersList',
  components: {
    'dashboard-app': Dashboard,
    'footer-app': Footer,
  },
  data() {
    return {
      orders: [] // Holds the list of orders
    };
  },
  methods: {
    async fetchOrders() {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No token found');
        }
        const response = await axios.get('http://localhost:8000/api/orders', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.orders = response.data;
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    },
    async deleteOrder(id) {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No token found');
        }
        await axios.delete(`http://localhost:8000/api/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // Refresh the order list
        this.fetchOrders();
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    }
  },
  created() {
    this.fetchOrders();
  }
};
</script>
  