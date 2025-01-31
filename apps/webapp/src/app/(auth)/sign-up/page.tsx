import SignUpForm from "@/components/forms/sign-up-form";
import React from "react";
import AuthHeader from "../_components/auth-header";
import Link from "next/link";

const SignUpPage = () => {
  return (
    <div>
      <AuthHeader
        title="Create your account"
        description="Welcome! Please fill in the details to get started."
      />
      <SignUpForm />
      <div className="text-center py-4 text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-primary font-medium">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
