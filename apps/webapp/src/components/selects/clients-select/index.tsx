"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Loader2Icon } from "lucide-react";

import { cn } from "@/lib/utils";
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
import { getClientById, searchClients } from "@/actions/clients";

interface ClientFilterProps {
  id: string;
  name: string;
}

export function ClientsSelect({
  value,
  onChange,
  disabled,
}: {
  value?: string | null;
  onChange: (client: string | null) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const [client, setClient] = React.useState<ClientFilterProps | null>(null);
  const [inputValue, setInputValue] = React.useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["search-clients", inputValue],
    queryFn: async () =>
      await searchClients({
        query: inputValue,
        page: 1,
      }),
  });

  React.useEffect(() => {
    if (value) {
      getAndSetClient();
    }

    async function getAndSetClient() {
      if (value) {
        const client = await getClientById(value);
        setClient(client || null);
      }
    }
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between flex w-full font-normal", {
            "text-muted-foreground": !value,
          })}
        >
          {client ? client.name : "Select client..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
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
                  onSelect={(currentValue) => {
                    setClient(
                      currentValue === client?.id
                        ? null
                        : data.find((i) => i.id === currentValue) || null
                    );
                    onChange(currentValue === client?.id ? null : currentValue);
                    setOpen(false);
                  }}
                >
                  {item.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      client?.id === item.id ? "opacity-100" : "opacity-0"
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
}
