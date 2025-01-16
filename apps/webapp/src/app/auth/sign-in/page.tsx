import { Icons } from "@/components/global/icons";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import SocialAuth from "../_components/social-auth";
import SignInForm from "@/components/forms/sign-in-form";
import { getCurrentSession } from "@/lib/auth/utils";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign In",
};

const SignInPage = async () => {
  const { user } = await getCurrentSession();

  if (user) {
    redirect("/");
  }

  return (
    <div className="max-w-md w-full shadow-lg bg-accent rounded-xl border overflow-hidden">
      <div className="px-10 py-8 bg-background rounded-lg border-b">
        <header className="text-center mb-6">
          <Icons.bigLogo className="w-36 mx-auto mb-6" />
          <h1 className="font-bold text-xl">Sign in to Craftly</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Welcome back! Please sign in to continue
          </p>
        </header>
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
        <SignInForm />
      </div>
      <div className="text-center py-4 text-sm text-muted-foreground">
        Don’t have an account?{" "}
        <Link href="/auth/sign-up" className="text-primary font-medium">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
