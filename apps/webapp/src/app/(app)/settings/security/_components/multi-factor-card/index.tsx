"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LockKeyholeIcon } from "lucide-react";
import React from "react";
import EnableDialog from "./enable-dialog";

const MultiFactorCard = ({
  twoFactorEnabled,
}: {
  twoFactorEnabled: boolean;
}) => {
  return (
    <div className={cn("px-7 py-5 flex gap-4 items-center", {})}>
      <LockKeyholeIcon className="w-6 h-6 flex-shrink-0" />
      <div className="w-full">
        <h4 className="text-sm font-semibold capitalize">Authenticator app</h4>
        <p className="text-sm text-muted-foreground">
          {twoFactorEnabled ? "Enabled" : "Not enabled"}
        </p>
      </div>
      {twoFactorEnabled ? (
        <Button variant="destructive" size="sm">
          Disable
        </Button>
      ) : (
        <EnableDialog />
      )}
    </div>
  );
};

export default MultiFactorCard;
