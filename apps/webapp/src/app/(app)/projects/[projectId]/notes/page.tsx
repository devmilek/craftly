"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";

import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";

const NotesPage = () => {
  const editor = useCreateBlockNote({});
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button>Open Sheet</Button>
        </SheetTrigger>
        <SheetContent className="sm:max-w-2xl p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Create a new note</SheetTitle>
          </SheetHeader>
          <BlockNoteView editor={editor} theme="light" />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NotesPage;
