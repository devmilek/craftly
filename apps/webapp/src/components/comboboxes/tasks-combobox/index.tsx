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
import { Task } from "@/lib/db/schemas";
import { getTaskById, searchTasks } from "@/actions/tasks";

export function TasksCombobox({
  value,
  onChange,
  disabled,
  projectId,
}: {
  value?: string | null;
  onChange: (client: string | null) => void;
  disabled?: boolean;
  projectId?: string | null;
}) {
  const [open, setOpen] = React.useState(false);
  const [task, setTask] = React.useState<Task | null>(null);
  const [inputValue, setInputValue] = React.useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["search-tasks", inputValue, projectId],
    queryFn: async () => await searchTasks(inputValue, projectId || undefined),
  });

  React.useEffect(() => {
    if (value) {
      getAndSetProject();
    } else {
      setTask(null);
    }

    async function getAndSetProject() {
      if (value) {
        const task = await getTaskById(value);
        setTask(task || null);
      }
    }
  }, [value, data]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between flex min-w-0"
        >
          <span className="truncate">
            {task ? task.name : "Select task..."}
          </span>
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search task..."
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
                    setTask(
                      currentValue === task?.id
                        ? null
                        : data.find((i) => i.id === currentValue) || null
                    );
                    onChange(currentValue === task?.id ? null : currentValue);
                    setOpen(false);
                  }}
                >
                  {item.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      task?.id === item.id ? "opacity-100" : "opacity-0"
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
