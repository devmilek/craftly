"use client";

import * as React from "react";
import { Check, FlagIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { taskPriority } from "@/lib/db/schemas";

const PriorityCombobox = ({
  value,
  onChange,
  children,
}: {
  value?: string | null;
  onChange: (value: string | null) => void;
  disabled?: boolean;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No priority found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                value="none"
                className="text-muted-foreground"
                onSelect={() => {
                  onChange(null);
                  setOpen(false);
                }}
              >
                <FlagIcon className="size-3" />
                None
                <Check
                  className={cn(
                    "ml-auto",
                    !value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
              {taskPriority.map((item) => (
                <CommandItem
                  key={item}
                  value={item}
                  className={cn("capitalize", {
                    "text-priority-low": item === "low",
                    "text-priority-medium": item === "medium",
                    "text-priority-high": item === "high",
                  })}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? null : currentValue);
                    setOpen(false);
                  }}
                >
                  <FlagIcon className="size-3" />
                  {item}
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

export default PriorityCombobox;
