import React from "react";
import AuthHeader from "../_components/auth-header";
import { MailOpenIcon } from "lucide-react";

const VerifyEmailPage = () => {
  return (
    <div className="border rounded-xl bg-muted/20 p-8 flex flex-col items-center justify-center">
      <MailOpenIcon />
      <AuthHeader
        className="text-center"
        title="Verify your email address"
        description="We have sent an email for verification. Email verification is important as it ensures the proper functioning of the organizations and the delivery of emails from the Craftly app. Additionally, verifying your email is necessary to unlock all features of the application."
      />
    </div>
  );
};

export default VerifyEmailPage;
