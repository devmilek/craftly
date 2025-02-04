"use client";

import * as React from "react";
import { Check } from "lucide-react";

import { cn, formatStatus } from "@/lib/utils";
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
import { taskStatus } from "@/lib/db/schemas";

const StatusCombobox = ({
  value,
  onChange,
  children,
}: {
  value?: string | null;
  onChange: (value: string | null) => void;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
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

export default StatusCombobox;
