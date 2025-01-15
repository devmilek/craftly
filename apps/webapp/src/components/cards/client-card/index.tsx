"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Client } from "@/lib/db/schemas";
import { ArchiveIcon, MoreHorizontal, PenIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type ClientCardProps = Client & {
  projectsCount: number;
  doneProjectsCount: number;
};

const ClientCard = ({ client }: { client: ClientCardProps }) => {
  return (
    <Link
      className="px-5 py-4 rounded-xl border hover:border-primary transition-colors"
      href={"/clients/" + client.id}
    >
      <div className="flex justify-between">
        <div className="size-9 p-1 border border-dashed rounded-lg bg-background shadow leading-none flex items-center justify-center">
          <div className="font-mono">{client.name[0]}</div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" className="size-6">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                console.log("Edit");
              }}
            >
              <PenIcon />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                console.log("Archive");
              }}
            >
              <ArchiveIcon />
              Archive
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <TrashIcon />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <h3 className="text-xl font-semibold">{client.name}</h3>
        <Badge variant="secondary" className="rounded-full">
          {client.archived ? "Archived" : "Active"}
        </Badge>
      </div>
      <Progress
        className="mt-3"
        value={(client.doneProjectsCount / client.projectsCount) * 100}
      />
      {client.projectsCount > 0 ? (
        <>
          <p className="text-muted-foreground text-sm mt-1">
            {client.doneProjectsCount} of {client.projectsCount} projects
            completed
          </p>
        </>
      ) : (
        <>
          <p className="text-muted-foreground text-sm mt-1">
            No projects found
          </p>
        </>
      )}
    </Link>
  );
};

export default ClientCard;
