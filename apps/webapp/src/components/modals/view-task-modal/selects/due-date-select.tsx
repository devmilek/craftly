"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, formatDateRelative } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import React from "react";

const DueDateSelect = ({
  value,
  onChange,
  disabled,
}: {
  value: Date | null;
  onChange: (client: Date | null) => void;
  disabled?: boolean;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant={value ? "secondary" : "ghost"}
          className={cn("flex min-w-0 justify-start w-full", {
            "text-muted-foreground": !value,
            "text-destructive": value && value < new Date(),
          })}
        >
          <CalendarIcon className={cn({ "opacity-50": !value })} />
          <span className="truncate">
            {value ? formatDateRelative(value) : <span>Pick due a date</span>}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value || undefined}
          onSelect={(date) => onChange(date || null)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DueDateSelect;
