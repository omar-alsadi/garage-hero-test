import { create } from "zustand";

type AuthStore = {
  email: string;
  password: string;
  userType: string;
  isOTPSent: boolean;
  isAuthenticated: boolean;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setUserType: (type: string) => void;
  setIsOTPSent: (status: boolean) => void;
  setIsAuthenticated: (status: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  email: "",
  password: "",
  userType: "root",
  isOTPSent: false,
  isAuthenticated: false,
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setUserType: (userType) => set({ userType }),
  setIsOTPSent: (status: boolean) => set({ isOTPSent: status }),
  setIsAuthenticated: (status) => set({ isAuthenticated: status }),
}));
