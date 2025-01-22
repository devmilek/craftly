"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modals-store";
import { PlusIcon } from "lucide-react";
import React from "react";

const RecentFiles = () => {
  const { onOpen } = useModal("upload-file");
  return (
    <section>
      <header className="flex items-center justify-between pb-4">
        <h2 className="text-xl font-semibold">Recent files</h2>
        <Button variant="ghost" onClick={onOpen}>
          Create
          <PlusIcon />
        </Button>
      </header>
    </section>
  );
};

export default RecentFiles;
