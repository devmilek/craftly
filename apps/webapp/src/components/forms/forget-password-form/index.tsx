"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { forgetPassword } from "@/lib/auth/auth-client";
import { toast } from "sonner";
import { Loader2, Mail } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { InputWithAdornments } from "@/components/ui/input-with-adornments";

const schema = z.object({
  email: z.string().email(),
});

const ForgetPasswordForm = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const { error } = await forgetPassword({
      email: values.email,
      redirectTo: "/reset-password",
    });

    if (error) {
      toast.error(
        error.message || "An error occurred while sending the reset link"
      );
      return;
    }
    form.reset();

    toast.success("Check your email for the reset link");
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <InputWithAdornments
                  startIcon={Mail}
                  {...field}
                  type="email"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="animate-spin" />}
          Send reset link
        </Button>
      </form>
    </Form>
  );
};

export default ForgetPasswordForm;
