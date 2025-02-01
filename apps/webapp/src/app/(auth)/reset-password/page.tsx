import ResetPasswordForm from "@/components/forms/reset-password-form";
import { AlertCircleIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  createSearchParamsCache,
  parseAsString,
  SearchParams,
} from "nuqs/server";
import React from "react";
import AuthHeader from "../_components/auth-header";

const resetPasswordParams = createSearchParamsCache({
  token: parseAsString,
  error: parseAsString,
});

const ResetPasswordPage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const { token, error } = await resetPasswordParams.parse(searchParams);

  if (!token && !error) {
    redirect("/sign-in");
  }

  if (error) {
    return (
      <div className="max-w-md w-full shadow-lg bg-accent rounded-xl border overflow-hidden">
        <div className="px-10 py-8 bg-background rounded-xl border-b">
          <header className="text-center flex flex-col items-center">
            <div className="border shadow bg-white rounded-lg p-3 mb-4">
              <AlertCircleIcon className="size-4" />
            </div>
            <h1 className="font-bold text-xl">Invalid token</h1>
            <p className="text-muted-foreground text-sm mt-1">
              The token is invalid or has expired, please try again.
            </p>
          </header>
        </div>
        <div className="text-center py-4 text-sm text-muted-foreground">
          Back to{" "}
          <Link href="/forgot-password" className="text-primary font-medium">
            Forgot password
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <AuthHeader
        title="Reset your password"
        description="Enter your new password to get access to your account"
      />
      <ResetPasswordForm />
    </>
  );
};

export default ResetPasswordPage;
