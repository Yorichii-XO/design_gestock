<template>
    <nav>
        <!-- header top section start -->
        <div class="container ">
            <div class="header_section_top">
                <div class="row">
                    <div class="col-sm-12 ">
                        <div class="custom_menu">
                            <ul>
                                <li><router-link to="/">Home</router-link></li>
                                <!-- Show login and register links only if the user is not authenticated -->
                                <li v-if="!isAuthenticated"><router-link to="/login">Login</router-link></li>
                                <li v-if="!isAuthenticated"><router-link to="/register">Register</router-link></li>
                                <!-- Show dashboard link only if the user is an admin -->
                                <li v-if="isAdmin"><router-link to="/dashboard">Dashboard</router-link></li>
                                <!-- Show logout link only if the user is authenticated -->
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
    name: 'NavbarApp',
    data() {
        return {
            isAuthenticated: !!localStorage.getItem('authToken'),
            isAdmin: localStorage.getItem('role') === 'admin'
        };
    },
    watch: {
        '$route'() {
            this.isAuthenticated = !!localStorage.getItem('authToken');
            this.isAdmin = localStorage.getItem('role') === 'admin';
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('authToken');
            localStorage.removeItem('role');
            this.isAuthenticated = false;
            this.isAdmin = false;
            this.$router.push('/login');
        }
    }
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
}

nav ul {
    display: flex;
    justify-content: center;
    list-style-type: none;
    padding: 0;
    margin: 0;
}

nav ul li {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 20px;
}

nav ul li a {
    text-decoration: none;
    color: #ffffff;
    font-weight: bold;
}
</style>
