"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteUser } from "@/lib/auth/auth-client";
import React from "react";
import { toast } from "sonner";

const DeleteAccountForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const handleDeleteAccount = async () => {
    setIsLoading(true);
    const { error } = await deleteUser({
      callbackURL: "/goodbye",
    });
    if (error) {
      toast.error("Failed to delete account");
      setIsLoading(false);
      return;
    }
    toast.success("We have sent you an email to confirm your account deletion");
    setIsLoading(false);
    setIsOpen(false);
  };
  return (
    <div className="p-6 flex flex-col justify-end items-end">
      <p className="text-sm text-muted-foreground mb-4">
        Deleting your account is irreversible. We will send you an email to
        confirm your account deletion.
      </p>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive">Delete account</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete account?</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete your account? This action is
              irreversible. We will send you an email to confirm your account
              deletion.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
              loading={isLoading}
              disabled={isLoading}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteAccountForm;
