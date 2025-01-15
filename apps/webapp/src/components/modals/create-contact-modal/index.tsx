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
import { createContactSchema, CreateContactSchema } from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import AvatarUploader from "@/components/ui/avatar-uploader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { PhoneInput } from "@/components/ui/phone-input";
import { ClientsSelect } from "@/components/selects/clients-select";
import { Checkbox } from "@/components/ui/checkbox";
import { createContact } from "@/actions/contacts/create-contact";
import { toast } from "sonner";
import { queryClient } from "@/components/providers/query-provider";
import { useRouter } from "next/navigation";

const CreateContactModal = () => {
  const { isOpen, onClose } = useModal("create-contact");
  const router = useRouter();

  const form = useForm<CreateContactSchema>({
    defaultValues: {
      name: "",
      email: "",
      primary: false,
      position: "",
    },
    resolver: zodResolver(createContactSchema),
  });

  const name = form.watch("name");
  const clientId = form.watch("clientId");

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: CreateContactSchema) => {
    const { error, id } = await createContact(values);

    if (error) {
      toast.error(error);
      return;
    }

    queryClient.invalidateQueries({
      queryKey: ["contacts"],
    });

    if (id) {
      toast("Contact created successfully", {
        action: {
          label: "View contact",
          onClick: () => {
            router.push(`/contacts/${id}`);
          },
        },
      });
    }

    onClose();
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Contact</DialogTitle>
          <DialogDescription>
            You can create a new contact and assign to a client (company) you
            are working with to have contact information.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label>Avatar</Label>
              <AvatarUploader className="size-24" fallback={name} />
            </div>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact name *</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="phone"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <PhoneInput {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="position"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="clientId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client</FormLabel>
                    <FormControl>
                      <ClientsSelect {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {clientId && (
              <FormField
                name="primary"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex items-center gap-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Mark as primary contact</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
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

export default CreateContactModal;
