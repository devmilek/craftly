"use client";

import React from "react";
import { MultiFactorDialog } from "./multi-factor-dialog";
import { LockKeyholeIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const MultiFactorCard = ({
  twoFactorEnabled,
}: {
  twoFactorEnabled: boolean;
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={cn("px-7 py-5 flex gap-4 items-center", {})}>
      <LockKeyholeIcon className="w-6 h-6 flex-shrink-0" />
      <div className="w-full">
        <h4 className="text-sm font-semibold capitalize">Authenticator app</h4>
        <p className="text-sm text-muted-foreground">
          {twoFactorEnabled ? "Enabled" : "Not enabled"}
        </p>
      </div>
      <button
        onClick={() => setOpen(true)}
        className="btn btn-outline"
      >
        Enable
      </button>
      <MultiFactorDialog open={open} onOpenChange={setOpen} />
    </div>
  );
};

export default MultiFactorCard;