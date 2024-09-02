<template>
  <dashboard-app />
  <div class="all-content-wrapper mt-10">
    <div class="single-pro-review-area mt-t-30 mg-b-15">
      <div class="container-fluid">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="product-status-wrap drp-lst">
            <h4>Edit Product</h4>
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
                                v-model="product.name"
                                type="text"
                                class="form-control"
                                placeholder="Product Name"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="devit-card-custom">
                            <div class="form-group">
                              <input
                                v-model="product.price"
                                type="number"
                                class="form-control"
                                placeholder="Price"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-lg-6">
                          <div class="devit-card-custom">
                            <div class="form-group">
                              <input
                                v-model="product.category_id"
                                type="text"
                                class="form-control"
                                placeholder="Category ID"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="devit-card-custom">
                            <div class="form-group">
                              <input
                                v-model="product.supplier_id"
                                type="text"
                                class="form-control"
                                placeholder="Supplier ID"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="image">Product Image</label>
                        <input
                          type="file"
                          @change="onImageChange"
                          class="form-control"
                        />
                        <!-- Display current product image if no new image is selected -->
                        <img
                          v-if="product.image && !imagePreview"
                          :src="product.image"
                          alt="Product Image"
                          style="max-width: 200px; margin-top: 10px;"
                        />
                        <!-- Display selected image preview -->
                        <img
                          v-if="imagePreview"
                          :src="imagePreview"
                          alt="Selected Image"
                          style="max-width: 200px; margin-top: 10px;"
                        />
                      </div>

                      <div class="row">
                        <div class="col-lg-12">
                          <div class="payment-adress">
                            <button
                              @click="updateProduct"
                              class="btn waves-effect waves-light"
                              style="background-color: #050724; color: white;"
                            >
                              Edit Product
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
  </div>
  <footer-app />
</template>
<script>
import axios from 'axios';
import Dashboard from '../Dashboard.vue';
import Footer from '../Footer.vue';

export default {
  name: 'EditProductApp',
  components: {
    'dashboard-app': Dashboard,
    'footer-app': Footer,
  },
  data() {
    return {
      product: {
        id: '',
        name: '',
        price: '',
        category_id: '',
        supplier_id: '',
        image: '' // This will hold the image path
      },
      selectedImage: null,
      imagePreview: null
    };
  },
  methods: {
    async fetchProduct() {
      try {
        const productId = this.$route.params.id;
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No token found');
        }
        const response = await axios.get(`http://localhost:8000/api/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.product = response.data;
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    },
    async updateProduct() {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No token found');
        }

        // Handle image upload if a new image is selected
        if (this.selectedImage) {
          const formData = new FormData();
          formData.append('images', this.selectedImage);

          // Upload the new image
          const imageUploadResponse = await axios.post('http://localhost:8000/api/products', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`
            }
          });

          // Update the image path in the product object
          this.product.image = imageUploadResponse.data.imagePath;
        }

        // Update the product details
        await axios.put(`http://localhost:8000/api/products/${this.product.id}`, this.product, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        this.$router.push({ name: 'ListProducts' });
       } catch (error) {
          console.error('Error updating category:', error);
        }
      }
    ,
    onImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedImage = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  },
  created() {
    this.fetchProduct();
  }
};
</script>

