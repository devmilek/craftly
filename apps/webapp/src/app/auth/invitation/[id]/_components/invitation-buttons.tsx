"use client";

import { Button } from "@/components/ui/button";
import { organization } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const InvitationButtons = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const onAccept = async () => {
    setIsLoading(true);
    const { error } = await organization.acceptInvitation({
      invitationId: id,
    });

    if (error) {
      setIsLoading(false);
      return toast.error(error.message);
    }

    router.push("/auth/select-organization");
  };

  const onReject = async () => {
    setIsLoading(true);
    const { error } = await organization.rejectInvitation({
      invitationId: id,
    });

    if (error) {
      setIsLoading(false);
      return toast.error(error.message);
    }

    router.push("/auth/select-organization");
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <Button variant="outline" onClick={onReject} disabled={isLoading}>
        Reject
      </Button>
      <Button onClick={onAccept} disabled={isLoading}>
        Accept
      </Button>
    </div>
  );
};

export default InvitationButtons;
