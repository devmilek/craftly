import { create } from "zustand";

export type ModalType =
  | "change-email"
  | "create-organization"
  | "create-project"
  | "create-client"
  | "create-contact"
  | "create-task"
  | "invite-members"
  | "upload-file";

type ModalData = {
  "upload-file": {
    projectId?: string;
  };
  "create-task": {
    projectId?: string;
  };
};

type ModalsState = {
  openModals: Partial<Record<ModalType, boolean>>;
  modalData: Partial<{
    [K in ModalType]: K extends keyof ModalData ? ModalData[K] : never;
  }>;
  openModal: <T extends ModalType>(
    modalId: T,
    data?: T extends keyof ModalData ? ModalData[T] : never
  ) => void;
  closeModal: (modalId: ModalType) => void;
  toggleModal: <T extends ModalType>(
    modalId: T,
    data?: T extends keyof ModalData ? ModalData[T] : never
  ) => void;
  setModalData: <T extends ModalType>(
    modalId: T,
    data: T extends keyof ModalData ? ModalData[T] : never
  ) => void;
};

export const useModalsStore = create<ModalsState>((set) => ({
  openModals: {},
  modalData: {},
  openModal: (modalId, data) =>
    set((state) => ({
      openModals: { ...state.openModals, [modalId]: true },
      modalData: data
        ? { ...state.modalData, [modalId]: data }
        : state.modalData,
    })),
  closeModal: (modalId) =>
    set((state) => ({
      openModals: { ...state.openModals, [modalId]: false },
      modalData: { ...state.modalData, [modalId]: undefined },
    })),
  toggleModal: (modalId, data) =>
    set((state) => ({
      openModals: {
        ...state.openModals,
        [modalId]: !state.openModals[modalId],
      },
      modalData: data
        ? { ...state.modalData, [modalId]: data }
        : state.modalData,
    })),
  setModalData: (modalId, data) =>
    set((state) => ({
      modalData: { ...state.modalData, [modalId]: data },
    })),
}));

export const useModal = <T extends ModalType>(modalId: T) => {
  const { openModals, modalData, openModal, closeModal, toggleModal } =
    useModalsStore();

  return {
    isOpen: !!openModals[modalId],
    data: modalData[modalId] as T extends keyof ModalData
      ? ModalData[T]
      : never,
    onOpen: (data?: T extends keyof ModalData ? ModalData[T] : never) =>
      openModal(modalId, data),
    onClose: () => closeModal(modalId),
    onToggle: (data?: T extends keyof ModalData ? ModalData[T] : never) =>
      toggleModal(modalId, data),
  };
};
