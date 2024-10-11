import { create } from "zustand";
import axiosInstance from "@/lib/axios";
import Cookies from "js-cookie";

const useArticles = create((set) => ({
  articles: [],
  pagination: {
    currentPage: 1,
    limit: 10,
    totalPage: 0,
    totalData: 0,
  },
  error: null,
  loading: false,

  // Fetch articles with pagination
  fetchArticles: async (page = 1) => {
    set({ loading: true });
    try {
      // You can pass tokens if necessary, for example:
      const token = Cookies.get("accessToken");
      const response = await axiosInstance.get(`/api/articles?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const {
        page: currentPage,
        limit,
        totalPage,
        totalData,
        data,
      } = response.data;

      // Update the store with articles and pagination info
      set({
        articles: data,
        pagination: { currentPage, limit, totalPage, totalData },
        error: null,
      });

      return { success: true, response };
    } catch (err) {
      set({
        error: err.response?.data?.detail || "Failed to fetch articles",
      });
      return { success: false, response: err.response }; // Return error
    } finally {
      set({ loading: false });
    }
  },
}));

export default useArticles;
