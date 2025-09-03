import { create } from "zustand";

type AuthState = {
  token: string | null;
  isLoggedIn: boolean;
  setToken: (t: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isLoggedIn: false,
  setToken: (t) => set({ token: t, isLoggedIn: true }),
  logout: () => set({ token: null, isLoggedIn: false }),
}));
