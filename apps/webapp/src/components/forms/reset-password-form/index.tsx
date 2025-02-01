"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { resetPassword } from "@/lib/auth/auth-client";
import { toast } from "sonner";
import { parseAsString, useQueryState } from "nuqs";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/ui/password-input";

const schema = z
  .object({
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  });

const ResetPasswordForm = () => {
  const [token] = useQueryState("token", parseAsString.withDefault(""));
  const [success, setSuccess] = React.useState(false);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const { error } = await resetPassword({
      newPassword: values.password,
      token,
    });

    if (error) {
      toast.error(
        error.message || "An error occurred while resetting password"
      );
      return;
    }

    setSuccess(true);
  };

  const isLoading = form.formState.isSubmitting;

  if (success) {
    return (
      <div className="border border-green-700 bg-green-50 p-6 rounded-lg">
        <h1 className="text-green-800 font-bold">Password reset successful</h1>
        <p className="text-sm text-muted-foreground mb-3">
          Your password has been reset successfully. You can now sign in with
          your new password.
        </p>
        <Link href="/sign-in" className="pt-4 underline text-sm font-medium">
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} disabled={isLoading} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="confirmPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput
                  {...field}
                  type="password"
                  disabled={isLoading}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} loading={isLoading}>
          Reset Password
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
