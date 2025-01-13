import ResetPasswordForm from "@/components/forms/reset-password-form";
import { Icons } from "@/components/global/icons";
import { AlertCircleIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  createSearchParamsCache,
  parseAsString,
  SearchParams,
} from "nuqs/server";
import React from "react";

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
      <div className="max-w-md w-full shadow-lg bg-gray-50 rounded-xl border overflow-hidden">
        <div className="px-10 py-8 bg-white rounded-xl border-b">
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
          <Link href="/forget-password" className="text-primary font-medium">
            forgot password
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full shadow-lg bg-gray-50 rounded-xl border overflow-hidden">
      <div className="px-10 py-8 bg-white rounded-xl border-b">
        <header className="text-center mb-6">
          <Icons.bigLogo className="w-36 mx-auto mb-6" />
          <h1 className="font-bold text-xl">Reset your password</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Enter your new password to get access to your account
          </p>
        </header>
        <ResetPasswordForm />
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

export default ResetPasswordPage;
