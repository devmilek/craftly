"use client";

import { ClientFilter } from "@/components/filters/client-filter";
import SearchInput from "@/components/global/search-input";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modals-store";
import { PlusIcon } from "lucide-react";
import React from "react";

const Header = () => {
  const { onOpen } = useModal("create-project");

  return (
    <header>
      <h1 className="text-2xl font-semibold mb-4">Contacts</h1>
      <div className="flex justify-between">
        <div className="flex gap-3">
          <SearchInput />
          <ClientFilter />
        </div>
        <div className="flex gap-3">
          <Button onClick={onOpen}>
            New contact
            <PlusIcon />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
