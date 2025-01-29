"use client";

import { getClientsByIds, searchClients } from "@/actions/clients";
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

interface ClientFilterProps {
  id: string;
  name: string;
}

export const ClientsFilter = () => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [clientsIds, setClientsIds] = useQueryState(
    "clients",
    parseAsArrayOf(parseAsString).withDefault([]).withOptions({
      shallow: true,
    })
  );

  const [inputValue, setInputValue] = React.useState("");
  const [clients, setClients] = React.useState<ClientFilterProps[]>([]);
  const [open, setOpen] = React.useState(false);

  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["clients", "search-clients", inputValue],
      queryFn: async ({ pageParam = 0 }) =>
        await searchClients({
          query: inputValue,
          page: pageParam,
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
    if (clientsIds.length > 0) {
      getAndSetClient();
    }

    async function getAndSetClient() {
      if (clientsIds.length > 0) {
        const data = await getClientsByIds(clientsIds);
        setClients(data || []);
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
          Client
          {clients.length > 0 && (
            <>
              <Separator orientation="vertical" />
              <div className="flex gap-1">
                {clients.length > 2 ? (
                  <>
                    <Badge variant="secondary">{clients.length} selected</Badge>
                  </>
                ) : (
                  <>
                    {clients.map((client) => (
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
            placeholder="Search clients..."
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
            {!isLoading && <CommandEmpty>No clients found.</CommandEmpty>}
            <CommandGroup>
              {data?.pages.map((page, index) => (
                <React.Fragment key={index}>
                  {page.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={item.id}
                      onSelect={() => {
                        setClients((prev) => {
                          if (prev.some((client) => client.id === item.id)) {
                            return prev.filter(
                              (client) => client.id !== item.id
                            );
                          } else {
                            return [...prev, item];
                          }
                        });
                        setClientsIds((prev) => {
                          if (prev.some((id) => id === item.id)) {
                            return prev.filter((id) => id !== item.id);
                          } else {
                            return [...prev, item.id];
                          }
                        });
                      }}
                    >
                      <Checkbox
                        checked={clientsIds.some(
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
                  className="text-center flex gap-2 justify-center bg-secondary hover:bg-secondary/80"
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
