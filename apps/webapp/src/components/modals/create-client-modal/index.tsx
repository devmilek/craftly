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
import { createClientSchema, CreateClientSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AvatarUploader from "@/components/ui/avatar-uploader";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createClient } from "@/actions/clients/create-client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const CreateClientModal = () => {
  const { isOpen, onClose } = useModal("create-client");
  const form = useForm<CreateClientSchema>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(createClientSchema),
  });

  const name = form.watch("name");

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: CreateClientSchema) => {
    const { error } = await createClient(values);

    if (error) {
      toast.error(error);
    }

    onClose();
    form.reset();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        onClose();
        form.reset();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new client</DialogTitle>
          <DialogDescription>
            Clients are the people or organizations you work with.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label>Logo</Label>
              <AvatarUploader className="size-24" fallback={name} />
            </div>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client name *</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <div className="p-5 rounded-lg bg-accent border grid gap-4">
              <FormField
                name="contactName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="contactEmail"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="contactPhone"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div> */}
          </form>
        </Form>
        <DialogFooter>
          <Button onClick={form.handleSubmit(onSubmit)} disabled={isLoading}>
            {isLoading && <Loader2 className="animate-spin size-4" />}
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateClientModal;
