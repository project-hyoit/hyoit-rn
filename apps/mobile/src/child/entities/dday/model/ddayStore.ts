import { create } from "zustand";

import type { DdayItem } from "./types";

interface DdayState {
  items: DdayItem[];
  addItem: (item: Omit<DdayItem, "id">) => void;
  deleteItem: (id: string) => void;
}

export const useDdayStore = create<DdayState>((set) => ({
  items: [
    {
      id: "1",
      title: "엄마 병원 가는 날",
      date: "2026-08-10",
      memo: "공복으로 방문하기",
    },
    {
      id: "2",
      title: "민수 결혼식",
      date: "2026-08-19",
    },
    {
      id: "3",
      title: "가족 여행",
      date: "2026-09-01",
    },
  ],
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
