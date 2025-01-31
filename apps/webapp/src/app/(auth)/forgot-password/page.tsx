import React from "react";
import AuthHeader from "../_components/auth-header";
import ForgetPasswordForm from "@/components/forms/forget-password-form";
import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";

const ForgotPasswordPage = () => {
  return (
    <div>
      <AuthHeader
        title="Forgot password"
        description="Enter your email to reset your password."
      />
      <ForgetPasswordForm />
      <Link
        href="/sign-in"
        className="text-center mx-auto text-sm font-medium flex items-center gap-2 justify-center mt-8 hover:underline"
      >
        <ChevronLeftIcon className="size-3" />
        <span>Back to Login Page</span>
      </Link>
    </div>
  );
};

export default ForgotPasswordPage;
