import React from "react";
import AuthHeader from "../_components/auth-header";
import { MailOpenIcon } from "lucide-react";
import ResendButton from "./resend-button";
import {
  createSearchParamsCache,
  parseAsString,
  SearchParams,
} from "nuqs/server";

const verifyEmailParams = createSearchParamsCache({
  email: parseAsString,
});

const VerifyEmailPage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const { email } = await verifyEmailParams.parse(searchParams);
  return (
    <div className="border rounded-xl bg-muted/40 p-8 gap-4 flex flex-col items-center justify-center">
      <MailOpenIcon />
      <AuthHeader
        showLogo={false}
        className="text-center"
        title="Verify your email address"
        description="We have sent an email for verification. Email verification is important as it ensures the proper functioning of the organizations and the delivery of emails from the Craftly app."
      />
      {email && <ResendButton email={email} />}
    </div>
  );
};

export default VerifyEmailPage;
