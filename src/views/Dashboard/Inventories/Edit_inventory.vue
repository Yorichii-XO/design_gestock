<template>
    <dashboard-app />
    <div class="all-content-wrapper mt-10">
      <div class="single-pro-review-area mt-t-30 mg-b-15">
        <div class="container-fluid">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="product-status-wrap drp-lst">
              <h4>Edit Inventory Item</h4>
              <div id="myTabContent" class="tab-content custom-product-edit">
                <div class="product-tab-list tab-pane fade active in" id="description">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="review-content-section">
                        <form @submit.prevent="updateInventory">
                          <!-- Inventory Name and Quantity -->
                          <div class="row">
                            <div class="col-lg-6">
                              <div class="form-group">
                                <input v-model="inventoryItem.capacity" type="text" class="form-control" placeholder="Item Name" />
                              </div>
                            </div>
                            <div class="col-lg-6">
                              <div class="form-group">
                                <input v-model="inventoryItem.current_stock" type="text" class="form-control" placeholder="Item Name" />
                              </div>
                            </div>
                            <div class="col-lg-6">
                              <div class="form-group">
                                <input v-model="inventoryItem.quantity" type="number" class="form-control" placeholder="Quantity" />
                              </div>
                            </div>
                          </div>
                          <!-- Location and Additional Details -->
                          <div class="row">
                            <div class="col-lg-6">
                              <div class="form-group">
                                <input v-model="inventoryItem.location" type="text" class="form-control" placeholder="Location" />
                              </div>
                            </div>
                            <div class="col-lg-6">
                              <div class="form-group">
                                <input v-model="inventoryItem.product_id" type="text" class="form-control" placeholder="Supplier ID" />
                              </div>
                            </div>
                          </div>
                          <!-- Submit Button -->
                          <div class="row">
                            <div class="col-lg-12">
                              <div class="payment-adress">
                                <button  @click="updateCategory" class="btn waves-effect waves-light" style="background-color: #050724; color: white;">
                                  Edit Inventory
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Additional content for other tabs can go here -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer-app />
  </template>
  
  <script>
  import axios from 'axios';
  import Dashboard from '../Dashboard.vue';
  import Footer from '../Footer.vue';
  
  export default {
    name: 'EditInventoryApp',
    components: {
      'dashboard-app': Dashboard,
      'footer-app': Footer,
    },
    data() {
      return {
        inventoryItem: {
          id: '',
          location: '',
          capacity: '',
          current_stock: '',
          quantity: '',
          product_id: '',
         
        }
      };
    },
    methods: {
      async fetchInventoryItem() {
        try {
          const inventoryId = this.$route.params.id;
          const token = localStorage.getItem('authToken');
          if (!token) {
            throw new Error('No token found');
          }
          const response = await axios.get(`http://localhost:8000/api/inventories/${inventoryId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          this.inventoryItem = response.data;
        } catch (error) {
          console.error('Error fetching inventory item:', error);
        }
      },
      async updateInventory() {
        try {
          const token = localStorage.getItem('authToken');
          if (!token) {
            throw new Error('No token found');
          }
          await axios.put(`http://localhost:8000/api/inventories/${this.inventoryItem.id}`, this.inventoryItem, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          this.$router.push('/list-inventories');
        } catch (error) {
          console.error('Error updating category:', error);
        }
      }
    },
    created() {
      this.fetchInventoryItem();
    }
  };
  </script>
  