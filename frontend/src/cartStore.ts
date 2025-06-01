import { create } from "zustand";          // ✅ named export
import type { ClothingItem } from "./types";

interface CartState {
  items: Record<string, { product: ClothingItem; qty: number }>;
  add: (item: ClothingItem) => void;
  remove: (id: string) => void;
  clear: () => void;
}

// <CartState> dá tipagem ao parâmetro `set`
export const useCart = create<CartState>((set) => ({
  items: {},
  add: (item) =>
    set((state) => {
      const current = state.items[item._id];
      const qty = current ? current.qty + 1 : 1;
      return {
        items: {
          ...state.items,
          [item._id]: { product: item, qty },
        },
      };
    }),
  remove: (id) =>
    set((state) => {
      const { [id]: _, ...rest } = state.items;
      return { items: rest };
    }),
  clear: () => set({ items: {} }),
}));
