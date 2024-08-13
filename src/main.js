// src/main.js

import { createApp } from 'vue';
import App from './App.vue'; // Corrected path
import router from './router'; // Corrected path


createApp(App)
  .use(router)
  .mount('#app');
