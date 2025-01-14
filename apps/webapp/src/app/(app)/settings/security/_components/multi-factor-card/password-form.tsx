import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { twoFactor } from "@/lib/auth/auth-client";

const schema = z.object({
  password: z.string().min(1),
});

const PasswordForm = ({
  setData,
}: {
  setData: (totpUri: string, recoveryCodes: string[]) => void;
}) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
    },
  });

  const onEnable = async (values: z.infer<typeof schema>) => {
    const { data, error } = await twoFactor.enable({
      password: values.password, // user password required
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    setData(data.totpURI, data.backupCodes);
  };

  const isPasswordLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onEnable)} className="grid gap-4">
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  disabled={isPasswordLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button disabled={isPasswordLoading}>Continue</Button>
        </div>
      </form>
    </Form>
  );
};

export default PasswordForm;
