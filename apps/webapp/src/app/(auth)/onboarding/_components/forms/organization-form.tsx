"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Switch } from "@/components/ui/switch";
import { useEffect } from "react";
import slugify from "@sindresorhus/slugify";

const schema = z.object({
  image: z.string(),
  name: z.string(),
  slug: z.string(),
  addSampleData: z.boolean().default(true),
});

type Schema = z.infer<typeof schema>;

export const OrganizationForm = () => {
  const { setData, setStep } = useOnboardingStore();
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      image: "",
      name: "",
      slug: "",
    },
  });

  const formName = form.watch("name");

  const onSubmit = (data: Schema) => {
    setData(data);
    setStep("theme");
  };

  const organizationName = form.watch("name");

  useEffect(() => {
    form.setValue("slug", slugify(organizationName));
  }, [form, organizationName]);

  return (
    <div>
      <AuthHeader
        title="Create your organization"
        description="Create your organization to get started. You'll be able to invite your team members later."
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
                <FormLabel>Organization name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="slug"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  The slug is used to create a unique URL for your organization.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="addSampleData"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>Add sample data</FormLabel>
                  <FormDescription>
                    Recommended for new users to get started quickly.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Continue</Button>
        </form>
      </Form>
    </div>
  );
};
