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
import AuthHeader from "@/app/(auth)/_components/auth-header";
import { Switch } from "@/components/ui/switch";
import { useEffect } from "react";
import slugify from "@sindresorhus/slugify";
import { organization } from "@/lib/auth/auth-client";
import { toast } from "sonner";
import { generateData } from "@/actions/seed/data";
import { useRouter } from "next/navigation";

const schema = z.object({
  image: z.string(),
  name: z.string(),
  slug: z.string(),
  addSampleData: z.boolean().default(true),
});

type Schema = z.infer<typeof schema>;

export const OrganizationForm = ({ name }: { name: string }) => {
  const { replace } = useRouter();
  const defaultName = name.split(" ")[0] + "'s workspace";
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      image: "",
      name: defaultName,
      slug: slugify(defaultName),
      addSampleData: true,
    },
  });

  const formName = form.watch("name");

  const onSubmit = async (values: Schema) => {
    const { error, data } = await organization.create({
      name: values.name,
      slug: values.slug,
    });

    if (error || !data) {
      toast.error(error?.message || "Failed to create workspace");
      return;
    }

    await organization.setActive({
      organizationId: data.id,
    });

    if (values.addSampleData) {
      await generateData();
    }

    replace("/");
  };

  const workspaceName = form.watch("name");

  useEffect(() => {
    form.setValue("slug", slugify(workspaceName));
  }, [form, workspaceName]);

  const isLoading = form.formState.isSubmitting;

  return (
    <div>
      <AuthHeader
        title="Create your workspace"
        description="Create your workspace to get started. You'll be able to invite your team members later."
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
                <FormLabel>Workspace name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isLoading} />
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
                  <Input {...field} disabled={isLoading} />
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
                    disabled={isLoading}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} loading={isLoading}>
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
};
