"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn, formatStatus } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { taskStatus } from "@/lib/db/schemas";

const StatusSelect = ({
  value,
  onChange,
  disabled,
}: {
  value?: string | null;
  onChange: (value: string | null) => void;
  disabled?: boolean;
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between flex min-w-0 w-full"
          disabled={disabled}
        >
          <span className="truncate">
            {value ? (
              <span className="flex items-center">
                <div
                  className={cn(
                    "size-2 rounded-full mr-2 flex-shrink-0",
                    `bg-status-${value}`
                  )}
                ></div>
                {formatStatus(value)}
              </span>
            ) : (
              "Select status..."
            )}
          </span>
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search status..." />
          <CommandList>
            <CommandEmpty>No status found.</CommandEmpty>
            <CommandGroup>
              {taskStatus.map((item) => (
                <CommandItem
                  key={item}
                  value={item}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "todo" : currentValue);
                    setOpen(false);
                  }}
                >
                  <div
                    className={cn(
                      "size-2 rounded-full mr-2",
                      `bg-status-${item}`
                    )}
                  ></div>
                  {formatStatus(item)}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === item ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StatusSelect;
