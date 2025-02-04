"use client";

import PriorityCombobox from "@/components/comboboxes/priority-combobox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FlagIcon } from "lucide-react";
import React from "react";

const PrioritySelect = ({
  value,
  onChange,
}: {
  value?: string | null;
  onChange: (value: string | null) => void;
}) => {
  return (
    <PriorityCombobox value={value} onChange={onChange}>
      <Button
        size="sm"
        variant="outline"
        className={cn("font-normal", !value && "text-muted-foreground", {
          "text-muted-foreground": !value,
          "text-priority-low": value === "low",
          "text-priority-medium": value === "medium",
          "text-priority-high": value === "high",
        })}
      >
        <FlagIcon />
        {value ? <span className="capitalize">{value}</span> : "Priority"}
      </Button>
    </PriorityCombobox>
  );
};

export default PrioritySelect;
