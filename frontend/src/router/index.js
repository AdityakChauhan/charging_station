import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../store/auth';
import LoginView from '../views/LoginView.vue';
import DashboardView from '../views/DashboardView.vue';

const routes = [
  { 
    path: '/login', 
    name: 'Login', 
    component: LoginView,
    meta: { requiresGuest: true }
  },
  { 
    path: '/dashboard', 
    name: 'Dashboard', 
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  { 
    path: '/', 
    redirect: '/dashboard' 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore();
  
  // Check authentication status
  if (!auth.isAuthenticated && localStorage.getItem('user')) {
    await auth.checkAuth();
  }

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next('/login');
  } else if (to.meta.requiresGuest && auth.isAuthenticated) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;


// store/auth.js
import { reactive } from 'vue';

export const authStore = reactive({
  token: localStorage.getItem('token') || '',
  setToken(newToken) {
    this.token = newToken;
    localStorage.setItem('token', newToken);
  },
  clearToken() {
    this.token = '';
    localStorage.removeItem('token');
  }
});
