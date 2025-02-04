"use client";

import * as React from "react";
import { Check, Loader2Icon } from "lucide-react";

import { cn } from "@/lib/utils";
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
import { getProjectById, searchProjects } from "./actions";
import { useInView } from "react-intersection-observer";
import { useDebounceValue } from "usehooks-ts";

interface ComboboxProject {
  id: string;
  name: string;
  clientName: string | null;
}

export function ProjectsCombobox({
  value,
  onChange,
  renderChildren,
  modal,
}: {
  value?: string | null;
  onChange: (client: string | null) => void;
  renderChildren: (project: ComboboxProject | null) => React.ReactNode;
  modal?: boolean;
}) {
  const { ref, inView } = useInView();
  const [open, setOpen] = React.useState(false);
  const [project, setProject] = React.useState<ComboboxProject | null>(null);
  const [inputValue, setInputValue] = React.useState("");
  const [debouncedInputValue] = useDebounceValue(inputValue, 400);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["search-projects", debouncedInputValue],
      queryFn: async ({ pageParam = 0 }) =>
        await searchProjects(debouncedInputValue, pageParam),
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
      getAndSetProject();
    }

    async function getAndSetProject() {
      if (value) {
        const project = await getProjectById(value);
        if (project) {
          setProject(project);
        } else {
          onChange(null);
          setProject(null);
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
      <PopoverTrigger asChild>{renderChildren(project)}</PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search project..."
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
            {!isLoading && <CommandEmpty>No projects found.</CommandEmpty>}
            <CommandGroup>
              {data?.pages.map((page, index) => (
                <React.Fragment key={index}>
                  {page?.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={item.id}
                      onSelect={(currentValue) => {
                        setProject(
                          currentValue === project?.id
                            ? null
                            : page.find((i) => i.id === currentValue) || null
                        );
                        onChange(
                          currentValue === project?.id ? null : currentValue
                        );
                        setOpen(false);
                      }}
                    >
                      <div>
                        <p>{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          ({item.clientName})
                        </p>
                      </div>
                      <Check
                        className={cn(
                          "ml-auto",
                          project?.id === item.id ? "opacity-100" : "opacity-0"
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
