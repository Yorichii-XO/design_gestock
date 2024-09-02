<template>
    <div class="left-sidebar-pro">
        <nav id="sidebar" class="mt-2 overflow-auto " style="height:80%;">
            <div class="sidebar-header">
                <a href="index.html"><img class="main-logo"
                        src="https://static.vecteezy.com/system/resources/thumbnails/005/533/918/small/stock-finance-logo-template-accounting-logo-template-charts-icon-free-vector.jpg"
                        alt="" width="100px" height="100px" /></a>
                <strong style="color:blue">GStock</strong>
            </div>
            <div class="left-custom-menu-adp-wrap comment-scrollbar">
                <nav class="sidebar-nav left-sidebar-menu-pro">
                    <ul class="metismenu" id="menu1">


                        <li>
                            <a class="has-arrow" href="all-professors.html" aria-expanded="false"><span
                                    class="educate-icon educate-professor icon-wrap"></span> <span
                                    class="mini-click-non">Users</span></a>
                            <ul class="submenu-angle" aria-expanded="false">
                                <li><router-link to="/list-users"><span class="mini-sub-pro">All
                                            Users</span></router-link></li>

                            </ul>
                        </li>
                        <li>
                            <a class="has-arrow" href="" aria-expanded="false"><span
                                    class="educate-icon educate-student icon-wrap"></span> <span
                                    class="mini-click-non">Clients</span></a>

                            <ul class="submenu-angle" aria-expanded="false">
                                <li><router-link to="/list-clients"><span class="mini-sub-pro">All
                                            Clients</span></router-link></li>

                            </ul>
                        </li>
                        <li>
                            <a class="has-arrow" href="" aria-expanded="false"><span
                                    class="educate-icon educate-course icon-wrap"></span> <span
                                    class="mini-click-non">Products</span></a>
                            <ul class="submenu-angle" aria-expanded="false">

                                <li><router-link to="/list-product"><span class="mini-sub-pro">All
                                            Products</span> </router-link></li>


                            </ul>
                        </li>
                        <li>
                            <a class="has-arrow" href="all-courses.html" aria-expanded="false"><span
                                    class="educate-icon educate-library icon-wrap"></span> <span
                                    class="mini-click-non">Categories</span></a>
                            <ul class="submenu-angle" aria-expanded="false">
                                <li><router-link to="/list-category"><span class="mini-sub-pro">All
                                            Categories</span></router-link></li>


                            </ul>
                        </li>
                        <li>
                            <a class="has-arrow" href="" aria-expanded="false"><span
                                    class="educate-icon educate-department icon-wrap"></span> <span
                                    class="mini-click-non">Orders</span></a>
                            <ul class="submenu-angle" aria-expanded="false">
                               
                                <li><router-link to="/list-orders"><span
                                            class="mini-sub-pro">Orders List</span></router-link></li>


                            </ul>
                        </li>
                        <li>
                            <a class="has-arrow" href="" aria-expanded="false"><span
                                    class="educate-icon educate-department icon-wrap"></span> <span
                                    class="mini-click-non">Suppliers</span></a>
                            <ul class="submenu-angle" aria-expanded="false">


                                <li><router-link to="/list-suppliers"><span class="mini-sub-pro">Suppliers
                                            List</span></router-link></li>


                            </ul>
                        </li>

                        <li>
                            <a class="has-arrow" href="" aria-expanded="false"><span
                                    class="educate-icon educate-department icon-wrap"></span> <span
                                    class="mini-click-non">Inventories</span></a>
                            <ul class="submenu-angle" aria-expanded="false">
                                <li><router-link to="/list-inventories"><span class="mini-sub-pro">Inventories
                                            List</span></router-link></li>


                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </nav>
    </div>
    
</template>
<script>
export default {
    name: 'Dashboard-app',
};
</script>