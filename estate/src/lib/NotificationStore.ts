import { create } from "zustand";
import apiRequest from "./ApiRequest";

// Define the state type
interface NotificationState {
  number: number;
  fetch: () => Promise<void>;
  decrease: () => void;
  reset: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  number: 0,
  fetch: async () => {
    const res = await apiRequest("/users/notification");
    set({ number: res.data });
  },
  decrease: () => {
    set((prev) => ({ number: prev.number - 1 }));
  },
  reset: () => {
    set({ number: 0 });
  },
}));
