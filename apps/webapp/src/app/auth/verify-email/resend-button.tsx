"use client";

import { sendVerificationEmail } from "@/lib/auth/auth-client";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const ResendButton = ({ email }: { email: string }) => {
  const [loading, setLoading] = useState(false);

  const resendEmail = async () => {
    setLoading(true);
    await sendVerificationEmail({
      email: email,
      callbackURL: "/app",
      fetchOptions: {
        onError: async (context) => {
          const { response } = context;
          if (response.status === 429) {
            const retryAfter = response.headers.get("X-Retry-After");
            toast.error(
              `Rate limit exceeded. Retry after ${retryAfter} seconds`
            );
          } else {
            toast.error(context.error.message);
          }
          setLoading(false);
        },
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          toast.success("Verification email sent");
          setLoading(false);
        },
      },
    });
  };

  return (
    <button
      className="text-primary font-medium inline-flex items-center disabled:cursor-not-allowed disabled:opacity-50"
      onClick={resendEmail}
      disabled={loading}
    >
      Resend
      {loading && <Loader2 className="size-3 ml-1 animate-spin" />}
    </button>
  );
};

export default ResendButton;
