import { create } from "zustand";
import axiosInstance from "@/libs/axios"; // Adjust the import path if necessary
import Cookies from "js-cookie"; // If you need to store any tokens or data

const useUsers = create((set) => ({
  users: [],
  error: null,
  loading: false,

  // Fetch all users
  fetchUsers: async () => {
    set({ loading: true });
    try {
      // You can pass tokens if necessary, for example:
      const token = Cookies.get("accessToken");
      const response = await axiosInstance.get("/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ users: response.data, error: null });
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

  // Optionally add a function to fetch a single user by ID
  fetchUserById: async (userId) => {
    set({ loading: true });
    try {
      const token = Cookies.get("accessToken");
      const response = await axiosInstance.get(`/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { success: true, response: response.data };
    } catch (err) {
      set({
        error: err.response?.data?.detail || `Failed to fetch user ${userId}`,
      });
      return { success: false, response: err.response };
    } finally {
      set({ loading: false });
    }
  },

  // Edit a user
  editUser: async (id, updatedData) => {
    try {
      const response = await axiosInstance.put(`/api/users/${id}`, updatedData);
      set((state) => ({
        users: state.users.map((user) =>
          user.id === id ? { ...user, ...updatedData } : user
        ),
      }));
      return response.data;
    } catch (error) {
      console.error("Failed to edit user:", error);
      throw error;
    }
  },

  // Delete a user
  deleteUser: async (id) => {
    try {
      await axiosInstance.delete(`/api/users/${id}`);
      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
      }));
    } catch (error) {
      console.error("Failed to delete user:", error);
      throw error;
    }
  },
}));

export default useUsers;
