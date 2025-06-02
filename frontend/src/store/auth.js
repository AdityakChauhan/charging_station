import { defineStore } from 'pinia'
import axios from '../utils/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    loading: false,
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    async login(email, password) {
      this.loading = true;
      try {
        const response = await axios.post('/users/login', { email, password });
        const userData = {
          email: response.data.email,
          name: response.data.name,
          id: response.data.id
        };
        this.user = userData;
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      } catch (e) {
        return false;
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      try {
        await axios.post('/users/logout');
      } catch (e) {
        console.error('Logout error:', e);
      } finally {
        this.user = null;
        localStorage.removeItem('user');
      }
    },

    async checkAuth() {
      try {
        const response = await axios.get('/users/me');
        const userData = {
          email: response.data.email,
          name: response.data.name,
          id: response.data.id
        };
        this.user = userData;
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      } catch (e) {
        this.user = null;
        localStorage.removeItem('user');
        return false;
      }
    }
  }
})