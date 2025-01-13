import React from "react";
import {
  createSearchParamsCache,
  parseAsString,
  SearchParams,
} from "nuqs/server";
import ResendButton from "./resend-button";
import { Icons } from "@/components/global/icons";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

const verifyEmailParams = createSearchParamsCache({
  email: parseAsString,
});

const VerifyEmailPage = async ({ searchParams }: PageProps) => {
  const { email } = await verifyEmailParams.parse(searchParams);

  return (
    <div className="max-w-md w-full shadow-lg bg-gray-50 rounded-xl border overflow-hidden">
      <div className="px-10 py-8 bg-white rounded-xl border-b">
        <header className="text-center">
          <Icons.bigLogo className="w-36 mx-auto mb-6" />
          <h1 className="font-bold text-xl">Verify your email address</h1>
          <p className="text-muted-foreground text-sm mt-1">
            We have sent an email to <strong>{email}</strong>. Please click the
            link in the email to verify your email address.
          </p>
        </header>
      </div>
      {email && (
        <div className="text-center py-4 text-sm text-muted-foreground">
          Didnt receive an email? <ResendButton email={email} />
        </div>
      )}
    </div>
  );
};

export default VerifyEmailPage;
