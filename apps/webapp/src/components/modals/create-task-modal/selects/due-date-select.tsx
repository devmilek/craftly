"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React from "react";

const DueDateSelect = ({
  value,
  onChange,
  disabled,
}: {
  value: Date | undefined;
  onChange: (client: Date | undefined) => void;
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
          })}
        >
          <CalendarIcon className="opacity-50" />
          <span className="truncate">
            {value ? format(value, "PPP") : <span>Pick due a date</span>}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DueDateSelect;
