<template>
  <div class="fashion_section">
    <div id="main_slider" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div v-for="(item, index) in products" :key="index" :class="['carousel-item', { active: index === 0 }]">
          <div class="container">
            <h1 class="fashion_taital">Man & Woman Fashion</h1>
            <div class="fashion_section_2">
              <div class="row">
                <div class="col-lg-4 col-sm-4" v-for="product in item.products" :key="product.id">
                  <div class="box_main">
                    <h4 class="shirt_text">{{ product.name }}</h4>
                    <p class="price_text">Price <span style="color: #262626;">$ {{ product.price }}</span></p>
                    <!-- Display the quantity from inventory -->
                    <p class="stock_text">Quantity: <span style="color: #262626;">{{ product.inventory_quantity || 'N/A' }}</span></p>
                    <div class="tshirt_img"><img :src="product.image_url" alt="Product Image"></div>
                    <div class="btn_main">
                      <div class="buy_bt"><a href="#">Buy Now</a></div>
                      <div class="seemore_bt"><a href="#">See More</a></div>
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
  name: 'ProduitApp',
  data() {
    return {
      products: [], // Array to hold products with inventory data
    };
  },
  mounted() {
    this.fetchProducts();
    this.fetchInventories();
  },
  methods: {
  async fetchProducts() {
    try {
      const token = 'YOUR_API_TOKEN'; // Replace with your token or get it from a secure source
      const response = await axios.get('http://localhost:8000/api/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.products = response.data;
      console.log('Fetched Products:', this.products); // Debugging line
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  },
  async fetchInventories() {
    try {
      const token = 'YOUR_API_TOKEN'; // Replace with your token or get it from a secure source
      const response = await axios.get('http://localhost:8000/api/inventories', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const inventories = response.data;
      console.log('Fetched Inventories:', inventories); // Debugging line

      // Map inventories to products
      this.products = this.products.map(product => {
        const inventory = inventories.find(inv => inv.product_id === product.id);
        console.log(`Mapping product ${product.id} to inventory`, inventory); // Debugging line
        return {
          ...product,
          inventory_quantity: inventory ? inventory.quantity : 'N/A'
        };
      });
    } catch (error) {
      console.error('Error fetching inventories:', error);
    }
  },
}

};
</script>
