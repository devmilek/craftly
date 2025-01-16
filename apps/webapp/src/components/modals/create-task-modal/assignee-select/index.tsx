"use client";

import * as React from "react";
import { Loader2Icon, UserPlus } from "lucide-react";

import { cn, getInitials } from "@/lib/utils";
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
import { useQuery } from "@tanstack/react-query";
import { getMembersByIds, searchMembers } from "./actions";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";

export function AssigneeSelect({
  value,
  onChange,
  disabled,
}: {
  value?: string[];
  onChange: (clientsIds: string[] | null) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const [members, setMembers] = React.useState<
    {
      id: string;
      name: string;
      email: string;
    }[]
  >([]);
  const [inputValue, setInputValue] = React.useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["members", inputValue],
    queryFn: async () => await searchMembers(inputValue),
  });

  React.useEffect(() => {
    if (value && value.length > 0) {
      getAndSetClient();
    }

    async function getAndSetClient() {
      if (value && value.length > 0) {
        const data = await getMembersByIds(value);
        setMembers(data || []);
      }
    }
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant={members.length > 0 ? "secondary" : "ghost"}
          role="combobox"
          aria-expanded={open}
          className={cn("flex min-w-0 justify-start w-full", {
            "text-muted-foreground": !value || value?.length === 0,
          })}
        >
          <UserPlus className="opacity-50" />
          <span className="truncate">
            {members.length > 0 ? (
              <>
                {members.length > 2 ? (
                  <>{members.length} selected</>
                ) : (
                  <>{members.map((member) => member.name).join(", ")}</>
                )}
              </>
            ) : (
              "Select members..."
            )}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search members..."
            value={inputValue}
            onValueChange={(val) => {
              setInputValue(val);
            }}
          />
          <CommandList>
            {isLoading && (
              <CommandEmpty className="flex items-center justify-center h-20">
                <Loader2Icon className="animate-spin size-4" />
              </CommandEmpty>
            )}
            {!isLoading && <CommandEmpty>No members found.</CommandEmpty>}
            <CommandGroup>
              {data?.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.id}
                  onSelect={(currentValue) => {
                    setMembers((prev) => {
                      if (prev?.some((member) => member.id === currentValue)) {
                        return prev?.filter(
                          (member) => member.id !== currentValue
                        );
                      }

                      return [...(prev || []), item];
                    });

                    if (value?.some((member) => member === currentValue)) {
                      return onChange(
                        value?.filter((member) => member !== currentValue)
                      );
                    }

                    onChange([...(value || []), currentValue]);
                    // setOpen(false);
                  }}
                >
                  <Checkbox
                    checked={value?.some((member) => member === item.id)}
                  />
                  <Avatar className="size-8">
                    <AvatarFallback>{getInitials(item.name)}</AvatarFallback>
                  </Avatar>
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
