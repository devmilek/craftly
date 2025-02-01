"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { Loader2, MailIcon } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { signInSchema } from "./schema";
import PasswordInput from "@/components/ui/password-input";
import { InputWithAdornments } from "@/components/ui/input-with-adornments";
import SocialAuth from "@/app/auth/_components/social-auth";

const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    await signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: (context) => {
          if (context.data.twoFactorRedirect) {
            console.log("two factor redirect");
            window.location.href = "/two-factor";
          }
          console.log("success");
          setLoading(false);
          push("/");
        },
        onError: (ctx) => {
          if (ctx.error.status === 403) {
            const params = new URLSearchParams();
            params.set("email", values.email);
            push(`/verify-email?${params.toString()}`);
            return;
          }
          toast.error(ctx.error.message);
          setLoading(false);
        },
      }
    );
  };

  useEffect(() => {
    if (
      !PublicKeyCredential.isConditionalMediationAvailable ||
      !PublicKeyCredential.isConditionalMediationAvailable()
    ) {
      return;
    }

    void signIn.passkey({ autoFill: true });
  }, []);

  return (
    <div>
      <SocialAuth />
      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
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
                    startIcon={MailIcon}
                    {...field}
                    type="email"
                    disabled={loading}
                    autoComplete="username webauthn"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between">
                  <FormLabel>Password</FormLabel>
                  <Link
                    href="/forgot-password"
                    className="text-sm underline text-muted-foreground"
                  >
                    Forget password?
                  </Link>
                </div>
                <FormControl>
                  <PasswordInput
                    {...field}
                    disabled={loading}
                    autoComplete="current-password webauthn"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button disabled={loading} type="submit">
            {loading ? <Loader2 className="animate-spin" /> : "Continue"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignInForm;
