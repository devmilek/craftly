"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { organization } from "@/lib/auth/auth-client";
import slugify from "@sindresorhus/slugify";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const schema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
});

const OnboardingOrganizationForm = ({ name }: { name: string }) => {
  const { replace } = useRouter();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: `${name.split(" ")[0]}'s Organization`,
      slug: slugify(`${name.split(" ")[0]}'s Organization`),
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    console.log(values);
    const { data, error } = await organization.create({
      name: values.name,
      slug: values.slug,
    });
    console.log(data, error);
    if (error) {
      toast.error(error.message);
      return;
    }
    if (!data) {
      return;
    }

    await organization.setActive({
      organizationId: data.id,
    });

    replace("/app");
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isLoading}
                  onBlur={() => {
                    form.setValue("slug", slugify(field.value));
                  }}
                />
              </FormControl>
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
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="animate-spin" />}
          Continue
        </Button>
      </form>
    </Form>
  );
};

export default OnboardingOrganizationForm;
