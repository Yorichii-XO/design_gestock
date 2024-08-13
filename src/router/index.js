import { createRouter, createWebHistory } from 'vue-router';
// In src/router/index.js
import Login from '../views/Login.vue'; // Ensure the correct relative path
import Register from '../views/Register.vue'; // Ensure the correct relative path
import Dashboard from '../views/Dashboard/Dashboard.vue'; // Ensure the correct relative path
import Index from '../views/Index.vue'; // Ensure the correct relative path

const routes = [
  { path: '/', component: Index },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/dashboard', component: Dashboard },
  { path: '/', component: Index },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userRole = localStorage.getItem('role'); // Assume role is stored in localStorage
  if (to.path === '/dashboard' && userRole !== 'admin') {
    next('/index');
  } else if (to.path === '/index' && userRole === 'admin') {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;
