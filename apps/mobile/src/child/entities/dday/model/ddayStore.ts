import { create } from "zustand";

import type { DdayItem } from "./types";

interface DdayState {
  items: DdayItem[];
  addItem: (item: Omit<DdayItem, "id">) => void;
  deleteItem: (id: string) => void;
}

export const useDdayStore = create<DdayState>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => ({
      items: [
        ...state.items,
        {
          ...item,
          id: String(Date.now()),
        },
      ].sort((a, b) => a.date.localeCompare(b.date)),
    })),
  deleteItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
}));
