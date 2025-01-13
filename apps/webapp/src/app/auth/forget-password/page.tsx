import ForgetPasswordForm from "@/components/forms/forget-password-form";
import { Icons } from "@/components/global/icons";
import Link from "next/link";
import React from "react";

const ForgetPasswordPage = () => {
  return (
    <div className="max-w-md w-full shadow-lg bg-gray-50 rounded-xl border overflow-hidden">
      <div className="px-10 py-8 bg-white rounded-xl border-b">
        <header className="text-center mb-6">
          <Icons.bigLogo className="w-36 mx-auto mb-6" />
          <h1 className="font-bold text-xl">Forgot password</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Enter your email to reset your password
          </p>
        </header>
        <ForgetPasswordForm />
      </div>
      <div className="text-center py-4 text-sm text-muted-foreground">
        You remember your password?{" "}
        <Link href="/sign-up" className="text-primary font-medium">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
