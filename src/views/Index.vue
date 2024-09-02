<template>
  <!-- banner bg main start -->
  <div class="banner_bg_main">
    <div class="logo_section">
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <div class="logo"><a href="index.html"><img src="/images/logo.png"></a></div>
          </div>
        </div>
      </div>
    </div>
    <!-- logo section end -->
    <!-- header section start -->
    <div class="header_section">
      <div class="container">
        <div class="containt_main">
          <div>
            <!-- Toggle Icon -->
            <span class="toggle_icon" @click="openNav">
              <img width="30px" src="/images/toggle-icon.png">
            </span>

            <!-- Side Navigation -->
            <div id="mySidenav" class="sidenav">
              <a href="javascript:void(0)" class="closebtn" @click="closeNav">&times;</a>
              <a href="index.html">Home</a>
              <a href="fashion.html">Fashion</a>
              <a href="electronic.html">Electronic</a>
              <a href="jewellery.html">Jewellery</a>
            </div>
          </div>
          <categories-app/>
          <search-app/>
          <div class="header_box">
            <div class="lang_box">
              <a href="#" title="Language" class="nav-link" data-toggle="dropdown" aria-expanded="true">
                <img src="/images/flag-uk.png" alt="flag" class="mr-2" title="United Kingdom"> English
                <i class="fa fa-angle-down ml-2" aria-hidden="true"></i>
              </a>
              <div class="dropdown-menu">
                <a href="#" class="dropdown-item">
                  <img src="/images/flag-france.png" class="mr-2" alt="flag">
                  French
                </a>
              </div>
            </div>
            <div class="login_menu">
              <ul>
                <li><a href="#">
                    <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                    <span class="padding_10">Cart</span></a>
                </li>
                <li><a href="#">
                    <i class="fa fa-user" aria-hidden="true"></i>
                    <span class="padding_10">{{ name }}</span></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- header section end -->
    <!-- banner section start -->
    <div class="banner_section layout_padding">
      <div class="container">
        <div id="my_slider" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="row">
                <div class="col-sm-12">
                  <h1 class="banner_taital">Get Start <br>Your favorite shopping</h1>
                  <div class="buynow_bt"><a href="#">Buy Now</a></div>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="row">
                <div class="col-sm-12">
                  <h1 class="banner_taital">Get Start <br>Your favorite shopping</h1>
                  <div class="buynow_bt"><a href="#">Buy Now</a></div>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="row">
                <div class="col-sm-12">
                  <h1 class="banner_taital">Get Start <br>Your favorite shopping</h1>
                  <div class="buynow_bt"><a href="#">Buy Now</a></div>
                </div>
              </div>
            </div>
          </div>
          <a class="carousel-control-prev" href="#my_slider" role="button" data-slide="prev">
            <i class="fa fa-angle-left"></i>
          </a>
          <a class="carousel-control-next" href="#my_slider" role="button" data-slide="next">
            <i class="fa fa-angle-right"></i>
          </a>
        </div>
      </div>
    </div>
<products-app/>
  </div>
</template>

<script>
import Categories from './Categories.vue';
import Search from './Search.vue';
import Products from './Products.vue';

export default {
  name: 'Home-app',
  components: {
    'categories-app': Categories,
    'search-app': Search,
    'products-app': Products

  },
  data() {
    return {
      name: 'Guest' // Default value
    };
  },
  
  methods: {
    openNav() {
      document.getElementById("mySidenav").style.width = "250px";
    },
    closeNav() {
      document.getElementById("mySidenav").style.width = "0";
    },
    async fetchUserName() {
      // const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
      try {
        const response = await fetch('http://localhost:8000/api/users', {
          // headers: {
          //   Authorization: `Bearer ${token}` // Include the token in the request headers
          // }
        });
        const data = await response.json();
        this.name = data.name || 'Guest'; // Update the name with the fetched data
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  },
  created() {
    this.fetchUserName(); // Fetch the user's name when the component is created
  }
};
</script>

<style scoped>
/* The side navigation menu */
.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
}

/* The navigation menu links */
.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

/* Close button styling */
.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

/* When you mouse over the navigation links, change their color */
.sidenav a:hover {
  color: #f1f1f1;
}
</style>
