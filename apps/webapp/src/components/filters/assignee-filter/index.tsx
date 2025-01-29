"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Separator } from "@/components/ui/separator";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2Icon, PlusCircleIcon, PlusIcon } from "lucide-react";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import React, { useEffect, useRef } from "react";
import { getOrgMembers, getOrgMembersByIds } from "./actions";

interface ClientFilterProps {
  id: string;
  name: string | null;
  email: string | null;
}

export const AssigneeFilter = () => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [assigneesIds, setAssigneesIds] = useQueryState(
    "assignees",
    parseAsArrayOf(parseAsString).withDefault([]).withOptions({
      shallow: true,
    })
  );

  const [inputValue, setInputValue] = React.useState("");
  const [assignees, setAssignees] = React.useState<ClientFilterProps[]>([]);
  const [open, setOpen] = React.useState(false);

  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["clients", "search-clients", inputValue],
      queryFn: async ({ pageParam = 0 }) =>
        await getOrgMembers({
          page: pageParam,
          query: inputValue,
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage.length === 0) {
          return undefined;
        }
        return lastPageParam + 1;
      },
    });

  useEffect(() => {
    if (assigneesIds.length > 0) {
      getAndSetAssignees();
    }

    async function getAndSetAssignees() {
      if (assigneesIds.length > 0) {
        const data = await getOrgMembersByIds(assigneesIds);
        setAssignees(data || []);
      }
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        console.log(entries);
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="border-dashed">
          <PlusCircleIcon />
          Assignees
          {assignees.length > 0 && (
            <>
              <Separator orientation="vertical" />
              <div className="flex gap-1">
                {assignees.length > 1 ? (
                  <>
                    <Badge variant="secondary">
                      {assignees.length} selected
                    </Badge>
                  </>
                ) : (
                  <>
                    {assignees.map((client) => (
                      <Badge key={client.id} variant="secondary">
                        {client.name}
                      </Badge>
                    ))}
                  </>
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
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
                  {page.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={item.id}
                      onSelect={() => {
                        setAssignees((prev) => {
                          if (prev.some((client) => client.id === item.id)) {
                            return prev.filter(
                              (client) => client.id !== item.id
                            );
                          } else {
                            return [...prev, item];
                          }
                        });
                        setAssigneesIds((prev) => {
                          if (prev.some((id) => id === item.id)) {
                            return prev.filter((id) => id !== item.id);
                          } else {
                            return [...prev, item.id];
                          }
                        });
                      }}
                    >
                      <Checkbox
                        checked={assigneesIds.some(
                          (client) => client === item.id
                        )}
                      />
                      {item.name}
                    </CommandItem>
                  ))}
                </React.Fragment>
              ))}
              {hasNextPage && (
                <CommandItem
                  onSelect={() => fetchNextPage()}
                  className="text-center flex gap-2 justify-center border border-dashed hover:bg-secondary/80 mt-1"
                >
                  {isFetchingNextPage && (
                    <>
                      <Loader2Icon className="animate-spin size-4" /> Loading...
                    </>
                  )}
                  {!isFetchingNextPage && (
                    <>
                      <PlusIcon className="size-4" /> Load more...
                    </>
                  )}
                </CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
