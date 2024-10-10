import { create } from 'zustand';
import axiosInstance from '@/libs/axios'; // Adjust the import path
import Cookies from 'js-cookie'; // Import js-cookie for managing cookies

const useAuth = create((set) => ({
  user: null,
  token: null,
  error: null,
  errorCode: null,
  loading: false,
  success: false,

  login: async (username, password) => {
    set({ loading: true, success: false });
    try {
      const response = await axiosInstance.post('/api/auth/login', {
        username,
        password,
      });
      const { access, refresh, user } = response.data; // Destructure tokens and user

      // Store tokens in cookies
      Cookies.set('accessToken', access, { expires: 1 }); // Set the access token to expire in 1 day
      Cookies.set('refreshToken', refresh, { expires: 7 }); // Set the refresh token to expire in 7 days

      // Store token in state if needed
      set({
        token: access,
        user: user, // If there's user info in the response, you can save it here
        loading: false,
        success: true,
      });

      return { success: true, response }; // Return success and the full response
    } catch (err) {
      set({
        error: err.response?.data?.detail || 'Login failed',
        errorCode: err.response?.status,
      });
      return { success: false, response: err.response }; // Return error response
    } finally {
      set({ loading: false });
    }
  },

  logout: () => {
    // Clear tokens from cookies
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    
    set({ user: null, token: null });
  },
}));

export default useAuth;
