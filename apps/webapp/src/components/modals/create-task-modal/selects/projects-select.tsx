"use client";

import * as React from "react";
import { Check, FolderIcon, Loader2Icon } from "lucide-react";

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
import { Project } from "@/lib/db/schemas";
import { getProjectById, searchProjects } from "@/actions/projects";

export function ProjectsSelect({
  value,
  onChange,
  disabled,
}: {
  value?: string | null;
  onChange: (client: string | null) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const [project, setProject] = React.useState<Project | null>(null);
  const [inputValue, setInputValue] = React.useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["search-projects", inputValue],
    queryFn: async () => await searchProjects(inputValue),
  });

  React.useEffect(() => {
    if (value) {
      getAndSetProject();
    }

    async function getAndSetProject() {
      if (value) {
        const project = await getProjectById(value);
        setProject(project || null);
      }
    }
  }, [value, data]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant={value ? "secondary" : "ghost"}
          role="combobox"
          aria-expanded={open}
          className={cn("flex min-w-0 justify-start w-full", {
            "text-muted-foreground": !value,
          })}
        >
          <FolderIcon className="opacity-50" />
          <span className="truncate">
            {project ? project.name : "Select projects..."}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search projects..."
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
              {data?.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.id}
                  onSelect={(currentValue) => {
                    setProject(
                      currentValue === project?.id
                        ? null
                        : data.find((i) => i.id === currentValue) || null
                    );
                    onChange(
                      currentValue === project?.id ? null : currentValue
                    );
                    setOpen(false);
                  }}
                >
                  {item.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      project?.id === item.id ? "opacity-100" : "opacity-0"
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
