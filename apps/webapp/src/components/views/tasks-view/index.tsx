"use client";

import SearchInput from "@/components/global/search-input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useModal } from "@/hooks/use-modals-store";
import { Tabs } from "@radix-ui/react-tabs";
import { KanbanIcon, ListIcon, PlusCircleIcon, PlusIcon } from "lucide-react";
import { parseAsBoolean, useQueryState } from "nuqs";
import React from "react";
import { useLocalStorage } from "usehooks-ts";
import KanbanView from "./kanban";
import { AssigneeFilter } from "@/components/filters/assignee-filter";
import { useSearchParams } from "next/navigation";

const TasksView = ({ projectId }: { projectId?: string }) => {
  const searchParams = useSearchParams();
  const { onOpen } = useModal("create-task");
  const [value, setValue] = useLocalStorage("tasks_view", "kanban", {
    initializeWithValue: false,
  });

  const membersIds = (searchParams.get("assignees") || "")
    .split(",")
    .filter((id) => id !== "");

  return (
    <>
      <div>
        <div className="flex justify-between">
          <div className="flex gap-3">
            <SearchInput />
            <StatusDropdown />
            <AssigneeFilter />
          </div>
          <div className="flex gap-3">
            <Tabs value={value} onValueChange={setValue}>
              <TabsList>
                <TabsTrigger value="kanban">
                  <KanbanIcon className="size-4 mr-2" />
                  Kanban
                </TabsTrigger>
                <TabsTrigger value="list">
                  <ListIcon className="size-4 mr-2" />
                  List
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Button onClick={() => onOpen()}>
              New Task
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-5">
        {value === "kanban" && <KanbanView projectId={projectId} />}
      </div>
    </>
  );
};

const StatusDropdown = () => {
  const [status, setStatus] = useQueryState(
    "archived",
    parseAsBoolean.withDefault(false)
  );

  const handleStatusChange = (value: string) => {
    setStatus(value === "true");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-dashed">
          <PlusCircleIcon />
          Status
          {status && (
            <>
              <Separator orientation="vertical" />
              <Badge variant="secondary">Archived</Badge>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={status.toString()}
          onValueChange={handleStatusChange}
        >
          <DropdownMenuRadioItem value="false">Active</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="true">Archived</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TasksView;
