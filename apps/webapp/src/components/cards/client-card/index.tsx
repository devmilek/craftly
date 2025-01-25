"use client";

import { removeClient } from "@/actions/clients/remove-client";
import { queryClient } from "@/components/providers/query-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useAlertModal } from "@/hooks/use-alert-modal";
import { Client } from "@/lib/db/schemas";
import { getInitials } from "@/lib/utils";
import { ArchiveIcon, MoreHorizontal, PenIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

type ClientCardProps = Client & {
  projectsCount: number;
  doneProjectsCount: number;
  avatarSrc: string | null;
};

export const ClientCard = ({ client }: { client: ClientCardProps }) => {
  const openAlert = useAlertModal((state) => state.open);

  const onRemove = () => {
    openAlert({
      title: "Delete Client",
      description:
        "Are you sure you want to delete this client? This action cannot be undone.",
      actionLabel: "Delete",
      onAction: async () => {
        const { error } = await removeClient(client.id);

        if (error) {
          toast.error(error);
          return;
        }

        toast.success("Client removed successfully");
        queryClient.invalidateQueries({
          queryKey: ["clients"],
        });
      },
      onCancel: () => {},
    });
  };
  return (
    <Link
      className="px-5 py-4 rounded-xl border hover:border-primary transition-colors"
      href={"/clients/" + client.id}
    >
      <div className="flex justify-between">
        <div className="size-9 p-0.5 border border-dashed rounded-lg bg-background shadow leading-none flex items-center justify-center">
          {client.avatarSrc ? (
            <Image
              src={client.avatarSrc}
              alt={client.name}
              width={36}
              height={36}
              unoptimized
              className="size-full object-cover rounded-md"
            />
          ) : (
            <div className="font-mono">{getInitials(client.name)}</div>
          )}
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
            <DropdownMenuItem
              className="text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
            >
              <TrashIcon />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col items-start gap-2 mt-4">
        <Badge variant="secondary" className="rounded-full">
          {client.archived ? "Archived" : "Active"}
        </Badge>
        <h3 className="text-xl font-semibold">{client.name}</h3>
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

export const ClientCardSkeleton = () => {
  return <Skeleton className="h-[160px]" />;
};
