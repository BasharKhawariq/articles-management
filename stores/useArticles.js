import { create } from "zustand";
import axiosInstance from "@/libs/axios"; // Adjust the import path if necessary
import Cookies from "js-cookie"; // If you need to store any tokens or data

const useArticles = create((set) => ({
  articles: [],
  error: null,
  loading: false,

  // Fetch all users
  fetchArticles: async () => {
    set({ loading: true });
    try {
      // You can pass tokens if necessary, for example:
      const token = Cookies.get("accessToken");
      const response = await axiosInstance.get("/api/articles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ articles: response.data, error: null });
      return { success: true, response }; // Return success and response
    } catch (err) {
      set({
        error: err.response?.data?.detail || "Failed to fetch users",
      });
      return { success: false, response: err.response }; // Return error
    } finally {
      set({ loading: false });
    }
  },
}));

export default useArticles;
