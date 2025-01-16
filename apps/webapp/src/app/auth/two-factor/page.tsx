import { Icons } from "@/components/global/icons";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import TwoFactorForm from "@/components/forms/two-factor-form";

export const metadata: Metadata = {
  title: "Two Factor",
};

const TwoFactorPage = () => {
  return (
    <div className="max-w-md w-full shadow-lg bg-accent rounded-xl border overflow-hidden">
      <div className="px-10 py-8 bg-background rounded-xl border-b">
        <header className="text-center mb-6">
          <Icons.bigLogo className="w-36 mx-auto mb-6" />
          <h1 className="font-bold text-xl">TOTP Verification</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Enter your 6-digit TOTP code to authenticate
          </p>
        </header>
        <TwoFactorForm />
      </div>
      <div className="text-center py-4 text-sm text-muted-foreground">
        <Link href="/auth/sign-in" className="text-primary font-medium">
          Back to Sign In
        </Link>
      </div>
    </div>
  );
};

export default TwoFactorPage;
