export type ModalType =
  | "change-email"
  | "create-organization"
  | "create-project"
  | "create-client"
  | "create-contact"
  | "create-task";

import { create } from "zustand";

type ModalsState = {
  openModals: Partial<Record<ModalType, boolean>>;
  openModal: (modalId: ModalType) => void;
  closeModal: (modalId: ModalType) => void;
  toggleModal: (modalId: ModalType) => void;
};

export const useModalsStore = create<ModalsState>((set) => ({
  openModals: {},
  openModal: (modalId) =>
    set((state) => ({
      openModals: { ...state.openModals, [modalId]: true },
    })),
  closeModal: (modalId) =>
    set((state) => ({
      openModals: { ...state.openModals, [modalId]: false },
    })),
  toggleModal: (modalId) =>
    set((state) => ({
      openModals: {
        ...state.openModals,
        [modalId]: !state.openModals[modalId],
      },
    })),
}));

export const useModal = (modalId: ModalType) => {
  const { openModals, openModal, closeModal, toggleModal } = useModalsStore();

  return {
    isOpen: !!openModals[modalId],
    onOpen: () => openModal(modalId),
    onClose: () => closeModal(modalId),
    onToggle: () => toggleModal(modalId),
  };
};
