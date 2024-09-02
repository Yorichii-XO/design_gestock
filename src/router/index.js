import { createRouter, createWebHistory } from 'vue-router';

// Import your views
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Dashboard from '../views/Dashboard/Dashboard.vue';
import Index from '../views/Index.vue';
import ProductDetail from '../views/ProductDetail.vue';
import OrdersList from '../views/OrdersList.vue';
//Categories
import AddCategory from '../views/Dashboard/Categories/Add_Category.vue';
import ListCategories from '../views/Dashboard/Categories/List_Categories.vue';
import EditCategory from '../views/Dashboard/Categories/Edit_Category.vue';
//Products
import AddProduct from '../views/Dashboard/Products/Add_product.vue';
import ListProducts from '../views/Dashboard/Products/List_products.vue';
import EditProduct from '../views/Dashboard/Products/Edit_product.vue';
//Inventories
import AddInventory from '../views/Dashboard/Inventories/Add_inventory.vue';
import ListInventories from '../views/Dashboard/Inventories/List_inventories.vue';
import EditInventory from '../views/Dashboard/Inventories/Edit_inventory.vue';
//Clients
import AddClient from '../views/Dashboard/Clients/Add_client.vue';
import ListClients from '../views/Dashboard/Clients/List_clients.vue';
import EditClient from '../views/Dashboard/Clients/Edit_client.vue';
//Users
import AddUser from '../views/Dashboard/Users/Add_user.vue';
import ListUsers from '../views/Dashboard/Users/List_users.vue';
import EditUser from '../views/Dashboard/Users/Edit_user.vue';
//Suppliers
import AddSupplier from '../views/Dashboard/Suppliers/Add_supplier.vue';
import ListSuppliers from '../views/Dashboard/Suppliers/List_suppliers.vue';
import EditSupplier from '../views/Dashboard/Suppliers/Edit_supplier.vue';
//Orders
import AddOrder from '../views/Dashboard/Orders/Add_order.vue';
import ListOrders from '../views/Dashboard/Orders/List_orders.vue';
import EditOrder from '../views/Dashboard/Orders/Edit_order.vue';
const routes = [
  { path: '/', component: Index },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true, requiresAdmin: true } },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail
  },
  {
    path: '/orders',
    name: 'OrdersList',
    component: OrdersList
  },
  {
    path: '/add-category',
    name: 'AddCategory',
    component: AddCategory
  },
  {
    path: '/list-category',
    name: 'ListCategories',
    component: ListCategories
  },
  {
    path: '/EditCategory/:id',
    name: 'EditCategory',
    component: EditCategory
  },

  {
    path: '/add-product',
    name: 'AddProduct',
    component: AddProduct
  },
  {
    path: '/list-product',
    name: 'ListProducts',
    component: ListProducts
  },
  {
    path: '/EditProduct/:id',
    name: 'EditProduct',
    component: EditProduct
  },
  {
    path: '/add-inventory',
    name: 'AddInventory',
    component: AddInventory
  },
  {
    path: '/list-inventories',
    name: 'ListInventories',
    component: ListInventories
  },
  {
    path: '/EditInventory/:id',
    name: 'EditInventory',
    component: EditInventory
  },
  {
    path: '/add-client',
    name: 'AddClient',
    component: AddClient
  },
  {
    path: '/list-clients',
    name: 'ListClients',
    component: ListClients
  },
  {
    path: '/EditClient/:id',
    name: 'EditClient',
    component: EditClient
  },
  {
    path: '/add-user',
    name: 'AddUser',
    component: AddUser
  },
  {
    path: '/list-users',
    name: 'ListUsers',
    component: ListUsers
  },
  {
    path: '/EditUser/:id',
    name: 'EditUser',
    component: EditUser
  },
  {
    path: '/add-supplier',
    name: 'AddSupplier',
    component: AddSupplier
  },
  {
    path: '/list-suppliers',
    name: 'ListSuppliers',
    component: ListSuppliers
  },
  {
    path: '/EditSupplier/:id',
    name: 'EditSupplier',
    component: EditSupplier
  },
  {
    path: '/add-order',
    name: 'AddOrder',
    component: AddOrder
  },
  {
    path: '/list-orders',
    name: 'ListOrders',
    component: ListOrders
  },
  {
    path: '/EditOrder/:id',
    name: 'EditOrder',
    component: EditOrder
  },
  
    {
      path: '/order',
      name: 'OrdersList',
      component: OrdersList,
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  const userRole = localStorage.getItem('role');

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Redirect to login if the route requires authentication but user is not logged in
    next('/login');
  } else if (to.meta.requiresAdmin && userRole !== 'admin') {
    // Redirect to home if the route requires admin role but user is not an admin
    next('/');
  } else {
    // Proceed to the route if all checks pass
    next();
  }
});

export default router;
