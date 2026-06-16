import { create } from "zustand";
import type { UserRole } from "@hyoit/types";

interface AuthState {
  isSignedIn: boolean;
  role: UserRole | null;
  hasParentOnboarded: boolean;
  hasChildOnboarded: boolean;
  setSignedIn: (value: boolean) => void;
  setRole: (role: UserRole | null) => void;
  setParentOnboarded: (value: boolean) => void;
  setChildOnboarded: (value: boolean) => void;
  resetAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isSignedIn: false,
  role: null,
  hasParentOnboarded: false,
  hasChildOnboarded: false,
  setSignedIn: (value) => set({ isSignedIn: value }),
  setRole: (role) => set({ role }),
  setParentOnboarded: (value) => set({ hasParentOnboarded: value }),
  setChildOnboarded: (value) => set({ hasChildOnboarded: value }),
  resetAuth: () =>
    set({
      isSignedIn: false,
      role: null,
      hasParentOnboarded: false,
      hasChildOnboarded: false,
    }),
}));
