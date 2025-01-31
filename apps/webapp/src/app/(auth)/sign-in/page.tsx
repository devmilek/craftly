import React from "react";
import AuthHeader from "../_components/auth-header";
import Link from "next/link";
import SignInForm from "@/components/forms/sign-in-form";

const SignInPage = () => {
  return (
    <div>
      <AuthHeader
        title="Sign in to Craftly"
        description="Welcome back! Please sign in to continue."
      />
      <SignInForm />
      <div className="text-center py-4 text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="text-primary font-medium">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
