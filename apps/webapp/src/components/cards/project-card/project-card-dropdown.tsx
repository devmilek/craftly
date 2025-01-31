"use client";

import { deleteProject } from "@/actions/projects/delete-project";
import { queryClient } from "@/components/providers/query-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAlertModal } from "@/hooks/use-alert-modal";
import { MoreHorizontalIcon, PenIcon, TrashIcon } from "lucide-react";
import React from "react";

const ProjectCardDropdown = ({ projectId }: { projectId: string }) => {
  const { open } = useAlertModal();
  const onDelete = () => {
    open({
      title: "Delete project",
      description: "Are you sure you want to delete this project?",
      actionLabel: "Delete",
      onAction: async () => {
        await deleteProject(projectId);

        await queryClient.invalidateQueries({
          queryKey: ["projects"],
        });
      },
      onCancel: () => {
        console.log("Cancel delete project");
      },
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="size-5 absolute top-4 right-4"
          size={"icon"}
        >
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <PenIcon /> Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <TrashIcon /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProjectCardDropdown;
