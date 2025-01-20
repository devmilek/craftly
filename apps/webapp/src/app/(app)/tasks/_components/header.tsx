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
import { useModal } from "@/hooks/use-modals-store";
import { PlusCircleIcon, PlusIcon } from "lucide-react";
import { parseAsBoolean, useQueryState } from "nuqs";
import React from "react";

const Header = () => {
  const { onOpen } = useModal("create-task");
  return (
    <header className="mb-5">
      <h1 className="text-2xl font-semibold mb-4">Tasks</h1>
      <div className="flex justify-between">
        <div className="flex gap-3">
          <SearchInput />
          <StatusDropdown />
        </div>
        <Button onClick={onOpen}>
          New Task
          <PlusIcon />
        </Button>
      </div>
    </header>
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

export default Header;
