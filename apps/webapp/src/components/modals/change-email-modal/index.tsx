"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modals-store";
import React from "react";
import { useForm } from "react-hook-form";
import { changeEmailSchema, ChangeEmailSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { changeEmail, useSession } from "@/lib/auth/auth-client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ChangeEmailModal = () => {
  const { isOpen, onClose } = useModal("change-email");
  const { data } = useSession();
  const form = useForm<ChangeEmailSchema>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: {
      newEmail: "",
    },
  });

  const onSubmit = async (values: ChangeEmailSchema) => {
    console.log(values);
    const { error, data } = await changeEmail({
      newEmail: values.newEmail,
      callbackURL: "/",
    });

    if (error) {
      return toast.error(error.message);
    }

    if (data) {
      toast.success(
        `An email has been sent to ${values.newEmail}. Please check your inbox to confirm the change.`
      );
      onClose();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Email</DialogTitle>
          <DialogDescription>
            We will send a change request to your new email address. After
            clicking on the link in the email, you will be automatically logged
            out and and will need to login in again with your new email address.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <Label className="pb-2">Current email address</Label>
              <Input value={data?.user.email} readOnly disabled />
            </div>
            <FormField
              name="newEmail"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New email address</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button onClick={form.handleSubmit(onSubmit)}>Request Change</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeEmailModal;
