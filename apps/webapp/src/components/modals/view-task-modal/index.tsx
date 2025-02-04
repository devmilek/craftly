"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Content from "./content";
import { useModal } from "@/hooks/use-modals-store";
import { queryClient } from "@/components/providers/query-provider";

const ViewTaskModal = () => {
  const { isOpen, onClose, data } = useModal("view-task");
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={() => {
        const { taskId } = data;
        if (!taskId) return;
        queryClient.invalidateQueries({
          queryKey: ["tasks", taskId],
        });
        onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 backdrop-blur-sm" />
        <Dialog.Content className="fixed max-w-3xl w-full left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
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

export default ViewTaskModal;
