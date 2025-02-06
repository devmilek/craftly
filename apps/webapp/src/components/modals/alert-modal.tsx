"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAlertModal } from "@/hooks/use-alert-modal";
import { Loader2 } from "lucide-react";

export const AlertModal = () => {
  const {
    isOpen,
    isLoading,
    title,
    description,
    actionLabel,
    onAction,
    onCancel,
    close,
    setLoading,
  } = useAlertModal();

  const handleAction = async () => {
    try {
      setLoading(true);
      await onAction();
      close();
    } catch (error) {
      console.error("Error in alert action:", error);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (isLoading) return;
    if (onCancel) onCancel();
    close();
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel} disabled={isLoading}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleAction}
            disabled={isLoading}
            className="gap-2"
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {actionLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
