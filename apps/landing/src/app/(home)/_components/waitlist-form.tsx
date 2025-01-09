"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";

const WaitlistForm = () => {
  const form = useForm({});
  return (
    <Form {...form}>
      <form className="flex gap-2">
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="Your address email"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Join waitlist</Button>
      </form>
    </Form>
  );
};

export default WaitlistForm;
