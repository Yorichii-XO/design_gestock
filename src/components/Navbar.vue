<template>
    <nav>
        <!-- header top section start -->
        <div class="container">
            <div class="header_section_top">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="custom_menu">
                            <ul>
                                <li><router-link to="/">Home</router-link></li>
                                <li v-if="!isAuthenticated"><router-link to="/login">Login</router-link></li>
                                <li v-if="!isAuthenticated"><router-link to="/register">Register</router-link></li>
                                <li v-if="isAdmin"><router-link to="/dashboard">Dashboard</router-link></li>
                                <li v-if="isAuthenticated"><a href="#" @click.prevent="logout">Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'navbar-app',
    computed: {
        isAdmin() {
            return localStorage.getItem('userRole') === 'admin';
        },
        isAuthenticated() {
            const isAuth = !!localStorage.getItem('userToken');
            console.log('Is Authenticated:', isAuth);  // Debugging output
            return isAuth;
        }
    },
    methods: {
        logout() {
            // Clear user-related data from localStorage
            localStorage.removeItem('userToken');
            localStorage.removeItem('userRole');
            
            // Optionally, redirect to the login page
            this.$router.push('/login');
        }
    }
};
</script>
