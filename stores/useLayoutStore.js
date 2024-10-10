// stores/useLayoutStore.js

import { create } from 'zustand';

const useLayoutStore = create((set) => ({
  isLoading: false,
  notification: {
    show: false,
    title: '',
    message: '',
    type: '', // e.g., 'success' or 'error'
  },

  setLoading: (loading) => set({ isLoading: loading }),

  setNotification: (notification) =>
    set({ notification }),

  closeNotification: () =>
    set((state) => ({
      notification: { ...state.notification, show: false },
    })),
}));

export default useLayoutStore;
