"use client";

import { useForm } from "react-hook-form";
import { onboardingSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import AvatarUploader from "@/components/ui/avatar-uploader";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useOnboardingStore } from "@/hooks/use-onboarding-form";
import AuthHeader from "@/app/(auth)/_components/auth-header";

const schema = onboardingSchema.pick({
  image: true,
  name: true,
  email: true,
});

type Schema = z.infer<typeof schema>;

export const ProfileForm = ({
  email,
  name,
}: {
  email: string;
  name: string;
}) => {
  const { setData, setStep } = useOnboardingStore();
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      image: "",
      name: name,
      email: email,
    },
  });

  const formName = form.watch("name");

  const onSubmit = (data: Schema) => {
    setData(data);
    setStep("theme");
  };

  return (
    <div>
      <AuthHeader
        title="Set up your profile"
        description="Check if the profile information is correct. You'll be able to
        change this later in the account settings page."
      />
      <Form {...form}>
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="image"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mx-auto">
                <AvatarUploader
                  value={field.value}
                  onValueChange={field.onChange}
                  fallback={formName}
                />
              </FormItem>
            )}
          />
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} readOnly disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Continue</Button>
        </form>
      </Form>
    </div>
  );
};
