"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { ChangePasswordFormSchema } from "./schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordRequirements from "@/components/global/password-requirements";
import { changePassword } from "@/lib/auth/auth-client";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { setPassword } from "./actions";
import { Button } from "@/components/ui/button";

const ChangePasswordForm = ({ isPasswordSet }: { isPasswordSet: boolean }) => {
  const router = useRouter();
  const form = useForm<ChangePasswordFormSchema>({
    defaultValues: {
      currentPassword: isPasswordSet ? "" : undefined,
      newPassword: "",
      confirmNewPassword: "",
      revokeOtherSessions: false,
    },
  });

  const onSubmit = async (data: ChangePasswordFormSchema) => {
    if (isPasswordSet) {
      if (!data.currentPassword) return;

      const { error } = await changePassword({
        newPassword: data.newPassword,
        currentPassword: data.currentPassword,
        revokeOtherSessions: data.revokeOtherSessions,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Password changed successfully.");
      router.refresh();
    } else {
      const status = await setPassword(data.newPassword);

      if (status) {
        toast.success("Password set successfully.");
        router.refresh();
      } else {
        toast.error("Failed to set password. Please try again.");
      }
    }
    form.reset();
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form className="p-6 grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        {isPasswordSet ? (
          <FormField
            name="currentPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <div>
            <Label>Current password</Label>
            <Input
              disabled
              readOnly
              className="mt-2"
              value="No password set yet."
            />
          </div>
        )}
        <FormField
          name="newPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input {...field} type="password" disabled={isLoading} />
              </FormControl>
              <FormMessage />
              <PasswordRequirements value={field.value} />
            </FormItem>
          )}
        />
        <FormField
          name="confirmNewPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input {...field} type="password" disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="revokeOtherSessions"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isLoading}
                />
              </FormControl>
              <FormLabel>Log out from other devices</FormLabel>
            </FormItem>
          )}
        />
        <div className="flex justify-end px-6 py-3">
          <Button type="submit" disabled={isLoading}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
