import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { createCheckIn, markCheckInAsChecked } from "../lib/checkInState";
import type { CheckInRawItem, CheckInViewerRole } from "./types";

type CheckInStore = {
  items: CheckInRawItem[];
  hasHydrated: boolean;
  sendCheckIn: (
    senderRole: CheckInViewerRole,
    message: string,
  ) => CheckInRawItem | null;
  confirmCheckIn: (itemId: string, viewerRole: CheckInViewerRole) => void;
  clearCheckIns: () => Promise<void>;
  setHydrated: (hydrated: boolean) => void;
};

const CHECK_IN_STORAGE_KEY = "hyoit-check-ins-v1";

const createCheckInId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export const useCheckInStore = create<CheckInStore>()(
  persist(
    (set) => ({
      items: [],
      hasHydrated: false,
      sendCheckIn: (senderRole, message) => {
        const trimmedMessage = message.trim();
        if (!trimmedMessage) return null;

        const item = createCheckIn({
          senderRole,
          message: trimmedMessage,
          id: createCheckInId(),
          createdAt: new Date().toISOString(),
        });

        set((state) => ({ items: [item, ...state.items] }));
        return item;
      },
      confirmCheckIn: (itemId, viewerRole) => {
        set((state) => ({
          items: markCheckInAsChecked({
            items: state.items,
            itemId,
            viewerRole,
            checkedAt: new Date().toISOString(),
          }),
        }));
      },
      clearCheckIns: async () => {
        await AsyncStorage.removeItem(CHECK_IN_STORAGE_KEY);
        set({ items: [] });
      },
      setHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: CHECK_IN_STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
