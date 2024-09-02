<template>
  <div class="fashion_section">
    <div id="main_slider" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div v-for="(item, index) in products" :key="index" :class="['carousel-item', { active: index === 0 }]">
          <div class="container">
            <h1 class="fashion_taital">Man & Woman Fashion</h1>
            <div class="fashion_section_2">
              <div class="row">
                <div class="col-lg-4 col-sm-4" v-for="product in item" :key="product.id">
                  <div class="box_main">
                    <h4 class="shirt_text">{{ product.name }}</h4>
                    <p class="price_text">Price <span style="color: #262626;">$ {{ product.price }}</span></p>
                    <div class="tshirt_img">
                      <img :src="product.image" alt="Product Image">
                    </div>
                    <!-- Display the quantity from inventory -->
                    <div>
                      <p class="price_text" style="color: #2713c1;">Quantity <span style="color: #262626;">{{ product.quantity || 'N/A' }}</span></p>
                    </div>
                    <div class="btn_main">
                      <div class="buy_bt">
                        <router-link :to="{ name: 'ProductDetail', params: { id: product.id } }">Buy Now</router-link>
                      </div>
                      <div class="seemore_bt">
                        <router-link :to="{ name: 'ProductDetail', params: { id: product.id } }">See More</router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a class="carousel-control-prev" href="#main_slider" role="button" data-slide="prev">
        <i class="fa fa-angle-left"></i>
      </a>
      <a class="carousel-control-next" href="#main_slider" role="button" data-slide="next">
        <i class="fa fa-angle-right"></i>
      </a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProductApp',
  data() {
    return {
      products: []
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

        const products = response.data;

        // Fetch inventory data and merge it with product data
        const inventories = await this.fetchInventories(token);
        this.products = this.mergeProductsWithInventory(products, inventories);
        this.products = this.chunkArray(this.products, 3); // Chunk data for carousel

      } catch (error) {
        console.error('Error fetching products:', error);
        if (error.response && error.response.status === 401) {
          console.error('Unauthorized: Check your token and authentication.');
        }
      }
    },
    async fetchInventories(token) {
      try {
        const response = await axios.get('http://localhost:8000/api/inventories', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching inventories:', error);
        return [];
      }
    },
    mergeProductsWithInventory(products, inventories) {
      return products.map(product => {
        const inventory = inventories.find(inv => inv.product_id === product.id);
        return {
          ...product,
          quantity: inventory ? inventory.quantity : 'N/A' // Set default to 'N/A' if no inventory found
        };
      });
    },
    chunkArray(array, chunkSize) {
      const result = [];
      for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
      }
      return result;
    }
  },
  created() {
    this.fetchProducts();
  }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
