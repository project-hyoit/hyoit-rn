import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { createCheckIn, markCheckInAsChecked } from "../lib/checkInState";
import type { CheckInRawItem, CheckInViewerRole } from "./types";

type CheckInStore = {
  items: CheckInRawItem[];
  hasHydrated: boolean;
  sendCheckIn: (senderRole: CheckInViewerRole, message: string) => void;
  confirmCheckIn: (itemId: string, viewerRole: CheckInViewerRole) => void;
  clearCheckIns: () => void;
  setHydrated: (hydrated: boolean) => void;
};

const createCheckInId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export const useCheckInStore = create<CheckInStore>()(
  persist(
    (set) => ({
      items: [],
      hasHydrated: false,
      sendCheckIn: (senderRole, message) => {
        const trimmedMessage = message.trim();
        if (!trimmedMessage) return;

        const now = new Date().toISOString();
        const item = createCheckIn(
          senderRole,
          trimmedMessage,
          createCheckInId(),
          now,
        );

        set((state) => ({ items: [item, ...state.items] }));
      },
      confirmCheckIn: (itemId, viewerRole) => {
        const checkedAt = new Date().toISOString();
        set((state) => ({
          items: markCheckInAsChecked(
            state.items,
            itemId,
            viewerRole,
            checkedAt,
          ),
        }));
      },
      clearCheckIns: () => set({ items: [] }),
      setHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: "hyoit-check-ins-v1",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
