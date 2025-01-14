import { Icons } from "@/components/global/icons";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import SocialAuth from "../_components/social-auth";
import SignUpForm from "@/components/forms/sign-up-form";

export const metadata: Metadata = {
  title: "Sign Up",
};

const SignUpPage = () => {
  return (
    <div className="max-w-md w-full shadow-lg bg-gray-50 rounded-xl border overflow-hidden">
      <div className="px-10 py-8 bg-white rounded-xl border-b">
        <header className="text-center mb-6">
          <Icons.bigLogo className="w-36 mx-auto mb-6" />
          <h1 className="font-bold text-xl">Create your account</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Welcome! Please fill in the details to get started.
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
        <SignUpForm />
      </div>
      <div className="text-center py-4 text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/auth/sign-in" className="text-primary font-medium">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
