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
import { Client } from "@/lib/db/schemas";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon, PlusCircleIcon } from "lucide-react";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import React, { useEffect } from "react";

export const ClientFilter = () => {
  const [clientsIds, setClientsIds] = useQueryState(
    "clients",
    parseAsArrayOf(parseAsString).withDefault([]).withOptions({
      shallow: true,
    })
  );
  const [inputValue, setInputValue] = React.useState("");
  const [clients, setClients] = React.useState<Client[]>([]);
  const [open, setOpen] = React.useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["clients", "search-clients", inputValue],
    queryFn: async () => await searchClients(inputValue),
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
              {data?.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.id}
                  onSelect={() => {
                    setClients((prev) => {
                      if (prev.some((client) => client.id === item.id)) {
                        return prev.filter((client) => client.id !== item.id);
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
                    checked={clientsIds.some((client) => client === item.id)}
                  />
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
