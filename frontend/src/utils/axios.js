import axios from 'axios'
import { useRouter } from 'vue-router'

const instance = axios.create({
  baseURL: '/api',
  withCredentials: true,
})

// Response interceptor
instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // If we get a 401, clear local storage and redirect to login
      localStorage.removeItem('user');
      const router = useRouter();
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

export default instance