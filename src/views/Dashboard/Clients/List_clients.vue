<template>
    <dashboard-app />
    <div class="all-content-wrapper mt-10">
      <div class="single-pro-review-area mt-t-30 mg-b-15">
        <div class="container-fluid">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="product-status-wrap drp-lst">
              <h4>Clients List</h4>
              <div class="add-product">
                <router-link to="/add-client" style="background-color: #050724; color: white">Add Client</router-link>
              </div>
              <div class="asset-inner">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Address</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="client in clients" :key="client.id">
                      <td>{{ client.id }}</td>
                      <td>{{ client.name }}</td>
                      <td>{{ client.email }}</td>
                      <td>{{ client.phone }}</td>
                      <td>{{ client.address }}</td>
                      <td>
                        <router-link :to="{ name: 'EditClient', params: { id: client.id } }" data-toggle="tooltip" title="Edit" class="pd-setting-ed">
                          <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                        </router-link>
                        <button @click="deleteClient(client.id)" data-toggle="tooltip" title="Trash" class="pd-setting-ed">
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
      <footer-app />
    </div>
  </template>
<script>
import axios from 'axios';
import Dashboard from '../Dashboard.vue';
import Footer from '../Footer.vue';

export default {
  name: 'clients-list',
  components: {
    'dashboard-app': Dashboard,
    'footer-app': Footer,
  },
  data() {
    return {
      clients: [] // Holds the list of clients
    };
  },
  methods: {
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
    async deleteClient(id) {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No token found');
        }
        await axios.delete(`http://localhost:8000/api/clients/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // Refresh the client list
        this.fetchClients();
      } catch (error) {
        console.error('Error deleting client:', error);
      }
    }
  },
  created() {
    this.fetchClients();
  }
};
</script>
  