import axios from 'axios';
import Cookies from 'js-cookie';
import useAuth from '@/stores/useAuth'; // Access the auth store

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Ensure your .env.local is set correctly
});

// Request Interceptor to attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('accessToken'); // Get access token from cookies
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      useAuth.getState().logout(); // Logout if 401 Unauthorized
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
