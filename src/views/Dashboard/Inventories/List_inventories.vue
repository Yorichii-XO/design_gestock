<template>
    <dashboard-app/>
    <div class="all-content-wrapper mt-10">
      <div class="single-pro-review-area mt-t-30 mg-b-15">
        <div class="container-fluid">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="product-status-wrap drp-lst">
              <h4>Inventory List</h4>
              <div class="add-product">
                <router-link to="/add-inventory" style=" background-color: #050724;color:white">Add Inventory</router-link>
              </div>
              <table class="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Location</th>
                    <th>Capacity</th>
                    <th>Current Stock</th>
                    <th>Quantity</th>
                    <th>Product ID</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="inventory in inventories" :key="inventory.id">
                    <td>{{ inventory.id }}</td>
                    <td>{{ inventory.location }}</td>
                    <td>{{ inventory.capacity }}</td>
                    <td>{{ inventory.current_stock }}</td>
                    <td>{{ inventory.quantity }}</td>
                    <td>{{ inventory.product_id }}</td>
                    <td>
                     <router-link :to="{ name: 'EditInventory', params: { id: inventory.id } }" data-toggle="tooltip" title="Edit" class="pd-setting-ed">
                          <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                        </router-link>
                      <button data-toggle="tooltip" title="Trash" class="pd-setting-ed" @click="deleteInventory(inventory.id)"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                    </td>
                  </tr>
                </tbody>
              </table>
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
  import axios from 'axios';
  
  export default {
    name: 'ListInventories',
    components: {
      'dashboard-app': Dashboard,
      'footer-app': Footer,
    },
    data() {
      return {
        inventories: [],
        authToken: '',
      };
    },
    mounted() {
      this.authToken = localStorage.getItem('authToken');
      this.fetchInventories();
    },
    methods: {
      fetchInventories() {
        axios.get('http://localhost:8000/api/inventories', {
          headers: {
            'Authorization': `Bearer ${this.authToken}`,
          }
        })
        .then(response => {
          this.inventories = response.data;
        })
        .catch(error => {
          console.error('Error fetching inventories:', error);
        });
      },
      editInventory(inventory) {
        // Handle editing the inventory (e.g., show a modal with the form)
        console.log('Edit inventory:', inventory);
      },
      deleteInventory(id) {
        axios.delete(`http://localhost:8000/api/inventories/${id}`, {
          headers: {
            'Authorization': `Bearer ${this.authToken}`,
          }
        })
        .then(response => {
          console.log('Inventory deleted successfully:', response.data);
          this.fetchInventories(); // Refresh the inventory list
        })
        .catch(error => {
          console.error('Error deleting inventory:', error);
        });
      }
    },
  };
  </script>
  
  <style scoped>
  .table {
    width: 100%;
    margin: 20px 0;
  }
  .btn {
    margin-right: 5px;
  }
  </style>
  