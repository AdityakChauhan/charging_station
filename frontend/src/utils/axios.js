import axios from 'axios'
import { useRouter } from 'vue-router'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
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