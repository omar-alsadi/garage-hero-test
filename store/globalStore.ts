import { ToastType } from "@/interfaces/toasts.interface";
import { create } from "zustand";

type GlobalStore = {
  isSubmitted: boolean;
  setIsSubmitted: (status: boolean) => void;

  userIpAddress: string;
  setUserIPAddress: (ip: string) => void;
  fetchIPAddress: () => void;

  // Enhance the UX as it's not mandatory to check Remember me checkbox and might bother the user
  isNoticed: boolean;
  gotNoticed: () => void;

  toastMessage: string;
  toastType: ToastType;
  showToast: (msg: string, type: ToastType) => void;
  closeToast: () => void;
};

export const useGlobalStore = create<GlobalStore>((set, get) => ({
  isSubmitted: false,
  setIsSubmitted: (status: boolean) => set({ isSubmitted: status }),

  userIpAddress: "127.0.0.1", // keep this id as a default temproraly
  setUserIPAddress: (ip) => set({ userIpAddress: ip }),

  fetchIPAddress: async () => {
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();
      set({ userIpAddress: data.ip });
    } catch (err) {
      console.error("Failed to fetch IP:", err);
    }
  },

  isNoticed: false,
  gotNoticed: () => {
    const current = get().isNoticed;
    if (!current) {
      setTimeout(() => set({ isNoticed: true }), 500);
    }
  },

  toastMessage: "",
  toastType: "success",
  showToast: (message, type) => {
    set({
      toastMessage: message,
      toastType: type,
    });

    setTimeout(() => {
      const { toastType: currentType } = get();
      if (currentType === type) {
        set({ toastMessage: "", toastType: "success" });
      }
    }, 5000);
  },
  closeToast: () =>
    set({
      toastMessage: "",
      toastType: "success",
    }),
}));
