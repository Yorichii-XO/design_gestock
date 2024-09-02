<template>
    <dashboard-app/>
    <dashboard-app/>
    <div class="all-content-wrapper mt-10">
      <div class="single-pro-review-area mt-t-30 mg-b-15">
        <div class="container-fluid">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="product-status-wrap drp-lst">
              <h4>Products List</h4>
              <div class="add-product">
                <router-link to="/add-product" style=" background-color: #050724;color:white">Add Product</router-link>
              </div>
                        <div class="asset-inner">
                            <table>
                                <tr>
                                    <th>Id</th>
                                    <th>Image</th>
                                    <th>Name of Product</th>
                                   
            
                                    <th>Price</th>
                                    <th>Category ID</th>
                                    <th>Supplier ID</th>
                                    <th>Actions</th>
                                </tr>
                                <!-- Use v-for to iterate over the product list -->
                                <tr v-for="(product, index) in products" :key="product.id">
                                    <td>{{ index + 1 }}</td>
                                    <td>
                            <img :src="product.image" alt="Product Image" style="max-width: 100px; max-height: 100px;" />
                            <!-- Debugging -->
                           
                        </td>
                                    <td>{{ product.name }}</td>
                                  
                                    <td>{{ product.price }}</td>
                                    <!-- Display Category ID and Supplier ID -->
                                    <td>{{ product.category_id }}</td>
                                    <td>{{ product.supplier_id }}</td>
                                    <td>
                                        <router-link :to="{ name: 'EditProduct', params: { id: product.id } }" data-toggle="tooltip" title="Edit" class="pd-setting-ed">
                          <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                        </router-link>
                                        <button data-toggle="tooltip" title="Trash" class="pd-setting-ed" @click="deleteProduct(product.id)"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="custom-pagination">
                            <ul class="pagination">
                                <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                <li class="page-item"><a class="page-link" href="#">1</a></li>
                                <li class="page-item"><a class="page-link" href="#">2</a></li>
                                <li class="page-item"><a class="page-link" href="#">3</a></li>
                                <li class="page-item"><a class="page-link" href="#">Next</a></li>
                            </ul>
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
    name: 'products-list',
    components: {
        'dashboard-app': Dashboard,
        'footer-app': Footer,
    },
    data() {
        return {
            products: [] // Holds the list of products
        };
    },
    methods: {
        async fetchProducts() {
            try {
                const token = localStorage.getItem('authToken');
                if (!token) {
                    throw new Error('No token found');
                }
                const response = await axios.get('http://localhost:8000/api/products', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                this.products = response.data;
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        },
        async deleteProduct(id) {
            try {
                const token = localStorage.getItem('authToken');
                if (!token) {
                    throw new Error('No token found');
                }
                await axios.delete(`http://localhost:8000/api/products/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // Refresh the product list
                this.fetchProducts();
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        },
        editProduct(id) {
            // Logic to edit the product
            console.log('Editing product with ID:', id);
            // You can navigate to a different route or open a modal for editing
        }
    },
    created() {
        this.fetchProducts();
    }
};
</script>
