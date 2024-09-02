<template>
    <dashboard-app/>
    <div class="all-content-wrapper mt-10">
      <div class="single-pro-review-area mt-t-30 mg-b-15">
        <div class="container-fluid">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="product-status-wrap drp-lst">
              <h4>Users List</h4>
              <div class="add-product">
                <router-link to="/add-user" style="background-color: #050724; color: white">Add User</router-link>
              </div>
              <div class="asset-inner">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Email Verified At</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user in users" :key="user.id">
                      <td>{{ user.id }}</td>
                      <td>{{ user.name }}</td>
                      <td>{{ user.email }}</td>
                      <td>{{ user.email_verified_at || 'N/A' }}</td>
                      <td>{{ user.role }}</td>
                      <td>
                        <router-link :to="{ name: 'EditUser', params: { id: user.id } }" data-toggle="tooltip" title="Edit" class="pd-setting-ed">
                          <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                        </router-link>
                        <button @click="deleteUser(user.id)" data-toggle="tooltip" title="Trash" class="pd-setting-ed">
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
  name: 'users-list',
  components: {
    'dashboard-app': Dashboard,
    'footer-app': Footer,
  },
  data() {
    return {
      users: [] // Holds the list of users
    };
  },
  methods: {
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
    async deleteUser(id) {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No token found');
        }
        await axios.delete(`http://localhost:8000/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // Refresh the user list
        this.fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  },
  created() {
    this.fetchUsers();
  }
};
</script>
  