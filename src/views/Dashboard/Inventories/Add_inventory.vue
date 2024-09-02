<template>
  <dashboard-app />
  <div class="all-content-wrapper mt-10">
    <div class="single-pro-review-area mt-t-30 mg-b-15">
      <div class="container-fluid">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="product-status-wrap drp-lst">
            <h4>Add Inventory Item</h4>
            <div class="product-payment-inner-st">
              <div id="myTabContent" class="tab-content custom-product-edit">
                <div class="product-tab-list tab-pane fade active in" id="description">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="review-content-section">
                        <form @submit.prevent="submitInventory">
                          <!-- Location -->
                          <div class="row">
                            <div class="col-lg-6">
                              <div class="form-group">
                                <input v-model="inventoryItem.location" type="text" class="form-control" placeholder="Location" />
                              </div>
                            </div>
                            <!-- Capacity -->
                            <div class="col-lg-6">
                              <div class="form-group">
                                <input v-model="inventoryItem.capacity" type="number" class="form-control" placeholder="Capacity" />
                              </div>
                            </div>
                          </div>
                          <!-- Current Stock -->
                          <div class="row">
                            <div class="col-lg-6">
                              <div class="form-group">
                                <input v-model="inventoryItem.current_stock" type="number" class="form-control" placeholder="Current Stock" />
                              </div>
                            </div>
                            <!-- Quantity -->
                            <div class="col-lg-6">
                              <div class="form-group">
                                <input v-model="inventoryItem.quantity" type="number" class="form-control" placeholder="Quantity" />
                              </div>
                            </div>
                          </div>
                          <!-- Product ID -->
                          <div class="row">
                            <div class="col-lg-12">
                              <div class="form-group">
                                <input v-model="inventoryItem.product_id" type="text" class="form-control" placeholder="Product ID" />
                              </div>
                            </div>
                          </div>
                          <!-- Submit Button -->
                          <div class="row">
                            <div class="col-lg-12">
                              <div class="payment-adress">
                                <button class="btn waves-effect waves-light" style="background-color: #050724; color: white;">
                                  Add Inventory
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
  </div>
  <footer-app />
</template>

<script>
import axios from 'axios';
import Dashboard from '../Dashboard.vue';
import Footer from '../Footer.vue';

export default {
  name: 'AddInventoryApp',
  components: {
    'dashboard-app': Dashboard,
    'footer-app': Footer,
  },
  data() {
    return {
      inventoryItem: {
        location: '',
        capacity: '',
        current_stock: '',
        quantity: '',
        product_id: ''
      }
    };
  },
  methods: {
    async submitInventory() {
      try {
        const token = localStorage.getItem('authToken');
        await axios.post('http://localhost:8000/api/inventories', this.inventoryItem, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        this.$router.push({ name: 'ListInventory' });
      } catch (error) {
        console.error('Error adding inventory:', error);
        alert("Network error, please check your connection and try again.");
      }
    }
  }
};
</script>
