"use client";

import StatusCombobox from "@/components/comboboxes/status-combobox";
import { Button } from "@/components/ui/button";
import { cn, formatStatus } from "@/lib/utils";
import React from "react";

const StatusSelect = ({
  value,
  onChange,
}: {
  value?: string | null;
  onChange: (value: string | null) => void;
}) => {
  return (
    <StatusCombobox value={value} onChange={onChange}>
      <Button
        size="sm"
        variant="outline"
        className={cn(
          "font-normal",
          !value && "text-muted-foreground",
          `text-status-${value}`,
          {
            "font-medium": value,
          }
        )}
      >
        <div
          className={cn(
            "size-1.5 rounded-full bg-muted-foreground",
            value && `bg-status-${value}`
          )}
        />
        {value ? <span>{formatStatus(value)}</span> : "Priority"}
      </Button>
    </StatusCombobox>
  );
};

export default StatusSelect;
