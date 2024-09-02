<template>
    <dashboard-app/>
    <div class="all-content-wrapper mt-10">
      <div class="single-pro-review-area mt-t-30 mg-b-15">
        <div class="container-fluid">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="product-status-wrap drp-lst">
              <h4>Suppliers List</h4>
              <div class="add-product">
                <router-link to="/add-supplier" style="background-color: #050724; color: white">Add Supplier</router-link>
              </div>
              <div class="asset-inner">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Contact Info</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="supplier in suppliers" :key="supplier.id">
                      <td>{{ supplier.id }}</td>
                      <td>{{ supplier.name }}</td>
                      <td>{{ supplier.contact_info }}</td>
                      <td>
                        <router-link :to="{ name: 'EditSupplier', params: { id: supplier.id } }" data-toggle="tooltip" title="Edit" class="pd-setting-ed">
                          <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                        </router-link>
                        <button @click="deleteSupplier(supplier.id)" data-toggle="tooltip" title="Trash" class="pd-setting-ed">
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
  name: 'SuppliersList',
  components: {
    'dashboard-app': Dashboard,
    'footer-app': Footer,
  },
  data() {
    return {
      suppliers: [] // Holds the list of suppliers
    };
  },
  methods: {
    async fetchSuppliers() {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No token found');
        }
        const response = await axios.get('http://localhost:8000/api/suppliers', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.suppliers = response.data;
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    },
    async deleteSupplier(id) {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No token found');
        }
        await axios.delete(`http://localhost:8000/api/suppliers/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // Refresh the supplier list
        this.fetchSuppliers();
      } catch (error) {
        console.error('Error deleting supplier:', error);
      }
    }
  },
  created() {
    this.fetchSuppliers();
  }
};
</script>
  