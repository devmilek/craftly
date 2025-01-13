"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getSession } from "@/lib/auth/auth-client";
import React from "react";
import { useForm } from "react-hook-form";
import { personalDetailsFormSchema, PersonalDetailsFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TrashIcon } from "lucide-react";

const PersonalDetailsForm = () => {
  const form = useForm<PersonalDetailsFormSchema>({
    resolver: zodResolver(personalDetailsFormSchema),
    defaultValues: async () => {
      const data = await getSession();

      if (!data || !data.data?.user) {
        return {
          image: undefined,
          email: "",
          name: "",
        };
      }

      return {
        image: data.data.user.image || undefined,
        email: data.data.user.email,
        name: data.data.user.name,
      };
    },
  });
  return (
    <Form {...form}>
      <form>
        <div className="p-6 grid gap-4">
          <FormField
            name="image"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mx-auto">
                <div className="relative size-36">
                  <Avatar className="size-full border border-dashed p-1 shadow cursor-pointer hover:border-primary transition">
                    {field.value && (
                      <AvatarImage src={field.value} className="rounded-full" />
                    )}
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-dashed rounded-full right-0 bottom-0 absolute hover:border-primary transition"
                  >
                    <TrashIcon />
                  </Button>
                </div>
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
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <div className="gap-2 flex">
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <Button variant="outline">Change</Button>
                </div>
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end px-6 py-4 bg-accent">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
};

export default PersonalDetailsForm;
