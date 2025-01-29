"use client";

import { ClientsFilter } from "@/components/filters/clients-filter";
import { ProjectStatusFilter } from "@/components/filters/project-status-filter";
import SearchInput from "@/components/global/search-input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useModal } from "@/hooks/use-modals-store";
import { KanbanIcon, ListIcon, PlusIcon } from "lucide-react";
import React from "react";
import { useLocalStorage } from "usehooks-ts";

const Header = () => {
  const { onOpen } = useModal("create-project");
  const [value, setValue] = useLocalStorage("projects_view", "kanban", {
    initializeWithValue: false,
  });

  return (
    <div className="flex justify-between">
      <div className="flex gap-3">
        <SearchInput />
        <ProjectStatusFilter />
        <ClientsFilter />
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
          New project
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
};

export default Header;
