"use client";

import React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Button } from "@/components/ui/button";
import { twoFactor } from "@/lib/auth/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const TwoFactorForm = () => {
  const [code, setCode] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const verifyTotp = async () => {
    setLoading(true);
    const { error } = await twoFactor.verifyTotp({ code });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    router.push("/");
  };

  return (
    <div className="w-full grid items-center justify-center">
      <InputOTP
        className="mx-auto"
        maxLength={6}
        value={code}
        onChange={(value) => setCode(value)}
        pattern={REGEXP_ONLY_DIGITS}
        disabled={loading}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <Button
        disabled={!code || code.length < 6 || loading}
        onClick={verifyTotp}
        className="mt-4"
      >
        Verify
      </Button>
    </div>
  );
};

export default TwoFactorForm;
