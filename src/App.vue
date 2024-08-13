<template>
  <div id="app">
    <navbar-app />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    'navbar-app':Navbar
  },
};
</script>
