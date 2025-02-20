"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useModal } from "@/hooks/use-modals-store";
import Content from "./content";

const CreateTaskModal = () => {
  const { isOpen, onClose } = useModal("create-task");
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 backdrop-blur-sm" />
        <Dialog.Content className="fixed max-w-xl w-full left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
          <Dialog.Title className="sr-only">View Task</Dialog.Title>
          <Dialog.Description className="sr-only">
            View task details
          </Dialog.Description>
          {/* MAIN CONTENT */}
          <Content />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CreateTaskModal;
