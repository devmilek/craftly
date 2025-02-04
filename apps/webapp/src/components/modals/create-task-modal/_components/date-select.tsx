"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn, formatDateRelative } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { addDays } from "date-fns";

export function DateSelect({
  value,
  onChange,
  disabled,
}: {
  value?: Date | null;
  onChange: (date?: Date | null) => void;
  disabled?: boolean;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant={"outline"}
          size="sm"
          className={cn("font-normal", !value && "text-muted-foreground", {
            "text-destructive": value && value < addDays(new Date(), -1),
          })}
        >
          <CalendarIcon />
          {value ? formatDateRelative(value) : <span>Due date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value || undefined}
          onSelect={(val) => onChange(val || null)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
