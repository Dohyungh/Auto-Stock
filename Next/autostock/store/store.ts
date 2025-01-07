import { create } from "zustand";

import { Stock } from "@/components/column";
import { getStockList } from "@/api/api";

interface StockStoreState {
  isUpdateModalOpen: boolean;
  isCreateModalOpen: boolean;
  currStock: Stock | null;
  stockList: Stock[] | [];
  setCurrStock: (stock: Stock) => void;
  setUpdateModalOpen: (bool: boolean) => void;
  setCreateModalOpen: (bool: boolean) => void;
  fetchStockList: () => void;
}

export const useStockStore = create<StockStoreState>((set) => ({
  isUpdateModalOpen: false,
  isCreateModalOpen: false,
  currStock: null,
  stockList: [],
  setCurrStock: (stock: Stock) =>
    set({ isUpdateModalOpen: true, currStock: stock }),
  setUpdateModalOpen: (bool) => set({ isUpdateModalOpen: bool }),
  setCreateModalOpen: (bool) => set({ isCreateModalOpen: bool }),
  fetchStockList: async () => {
    const data = await getStockList();
    return set({ stockList: data });
  },
}));
