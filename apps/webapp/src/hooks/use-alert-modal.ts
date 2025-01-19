import { create } from "zustand";

type AlertModal = {
  isOpen: boolean;
  isLoading: boolean;
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void | Promise<void>;
  onCancel: () => void;
  open: (
    params: Omit<
      AlertModal,
      "isOpen" | "isLoading" | "open" | "close" | "setLoading"
    >
  ) => void;
  close: () => void;
  setLoading: (isLoading: boolean) => void;
};

export const useAlertModal = create<AlertModal>((set) => ({
  isOpen: false,
  isLoading: false,
  title: "",
  description: "",
  actionLabel: "",
  onAction: () => {},
  onCancel: () => {},
  open: (params) => set({ isOpen: true, isLoading: false, ...params }),
  close: () => set({ isOpen: false, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
}));
