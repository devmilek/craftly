"use client";

import * as React from "react";
import { Check, Loader2Icon } from "lucide-react";

import { cn, getInitials } from "@/lib/utils";
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
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useDebounceValue } from "usehooks-ts";
import { getMemberById, searchMembers } from "./actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ComboboxMember {
  id: string;
  name: string;
  email: string;
  userId: string;
  userImage: string | null;
}

export function MemberCombobox({
  value,
  onChange,
  renderChildren,
  modal,
}: {
  value?: string | null;
  onChange: (client: string | null) => void;
  renderChildren: (project: ComboboxMember | null) => React.ReactNode;
  modal?: boolean;
}) {
  const { ref, inView } = useInView();
  const [open, setOpen] = React.useState(false);
  const [member, setMember] = React.useState<ComboboxMember | null>(null);
  const [inputValue, setInputValue] = React.useState("");
  const [debouncedInputValue] = useDebounceValue(inputValue, 400);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["members", debouncedInputValue, "combobox"],
      queryFn: async ({ pageParam = 0 }) =>
        await searchMembers(debouncedInputValue, pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage.length === 0) {
          return undefined;
        }
        return lastPageParam + 1;
      },
    });

  React.useEffect(() => {
    if (value) {
      getAndSetMember();
    }

    async function getAndSetMember() {
      if (value) {
        console.log(value);
        const member = await getMemberById(value);
        console.log(member);
        if (member) {
          setMember(member);
        } else {
          onChange(null);
          setMember(null);
        }
      }
    }
  }, [onChange, value]);

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={modal}>
      <PopoverTrigger asChild>{renderChildren(member)}</PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command shouldFilter={false}>
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
              {data?.pages.map((page, index) => (
                <React.Fragment key={index}>
                  {page?.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={item.id}
                      onSelect={(currentValue) => {
                        setMember(
                          currentValue === member?.id
                            ? null
                            : page.find((i) => i.id === currentValue) || null
                        );
                        onChange(
                          currentValue === member?.id ? null : currentValue
                        );
                        setOpen(false);
                      }}
                    >
                      <Avatar className="size-8">
                        {item.userImage && <AvatarImage src={item.userImage} />}
                        <AvatarFallback>
                          {getInitials(item.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          ({item.email})
                        </p>
                      </div>
                      <Check
                        className={cn(
                          "ml-auto",
                          member?.id === item.id ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </React.Fragment>
              ))}
              {hasNextPage && (
                <CommandItem>
                  <div
                    ref={ref}
                    className="flex items-center justify-center w-full py-2"
                  >
                    {isFetchingNextPage && (
                      <Loader2Icon className="animate-spin size-4 text-muted-foreground" />
                    )}
                  </div>
                </CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
