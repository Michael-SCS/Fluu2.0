import { create } from "zustand";

export type GroceryProduct = {
  id: string;
  name: string;
  quantity?: string;
  price?: string;
  completed: boolean;
};

type GroceryStore = {
  products: GroceryProduct[];

  addProducts: (items: Omit<GroceryProduct, "completed">[]) => void;

  toggleProduct: (id: string) => void;
};

export const useGroceryStore = create<GroceryStore>((set) => ({

  products: [],

  addProducts: (items) =>
    set((state) => {

      const updated = [...state.products];

      items.forEach((newItem) => {

        const existing = updated.find(
          (p) =>
            p.name.toLowerCase() ===
            newItem.name.toLowerCase()
        );

        if (existing) {

          const oldQty = Number(existing.quantity || 0);
          const newQty = Number(newItem.quantity || 0);

          existing.quantity = String(oldQty + newQty);

        } else {

          updated.push({
            ...newItem,
            completed: false,
          });

        }

      });

      return { products: updated };

    }),

  toggleProduct: (id) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id
          ? { ...p, completed: !p.completed }
          : p
      ),
    })),

}));