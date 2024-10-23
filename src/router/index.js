import { createWebHistory, createRouter } from 'vue-router';

import Home from '@/pages/Home.vue';
import Catalog from '@/pages/Catalog.vue';
import Favorite from '@/pages/Favorite.vue';
import Stocks from '@/pages/Stocks.vue';
import Auth from '@/pages/Auth.vue';
import Reg from '@/pages/Reg.vue';
import Rec from '@/pages/Rec.vue';
import Profile from '@/pages/Profile.vue';
import Cart from '@/pages/Cart.vue';
import Contacts from "@/pages/Contacts.vue";
import About from "@/pages/About.vue";
import AdminPanel from "@/pages/AdminPanel.vue"; // Import the AdminPanel component

const routes = [
    { path: '/', component: Home },
    { path: '/Catalog', component: Catalog },
    { path: '/Favorite', component: Favorite },
    { path: '/Stocks', component: Stocks },
    { path: '/Auth', component: Auth },
    { path: '/Reg', component: Reg },
    { path: '/Recovery', component: Rec },
    { path: '/Profile', component: Profile },
    { path: '/Cart', component: Cart },
    { path: '/Contacts', component: Contacts },
    { path: '/About', component: About },
    { path: '/AdminPanel', component: AdminPanel, meta: { requiresAdmin: true } } // Define the AdminPanel route with meta
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    },
});

router.beforeEach((to, from, next) => {
    if (to.path === '/AdminPanel') {
        const userString = localStorage.getItem('user');
        if (userString) {
            try {
                const user = JSON.parse(userString);
                const userLogin = user.phone;
                if (to.matched.some(record => record.meta.requiresAdmin)) {
                    // Check if the route requires admin access and the user is not admin
                    if (userLogin !== 'admin') {
                        next('/'); // Redirect to home if the user is not admin
                    } else {
                        next(); // Allow access if the user is admin
                    }
                } else {
                    next(); // Allow access if the route does not require admin access
                }
            } catch (error) {
                console.error('Error parsing user data from localStorage', error);
                next('/'); // Redirect to home if there is a JSON parsing error
            }
        } else {
            next('/'); // Redirect to home if user data is not found in localStorage
        }
    } else {
        next(); // Allow access to other routes
    }
});

export default router;
