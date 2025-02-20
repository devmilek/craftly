"use client";

import { changeProjectStatus } from "@/actions/projects/change-project-status";
import { queryClient } from "@/components/providers/query-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { projectStatus } from "@/lib/db/schemas";
import { cn, formatStatus } from "@/lib/utils";
import { ProjectStatus } from "@/types";
import { ChevronDown } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const ProjectStatusDropdown = ({
  status,
  projectId,
}: {
  status: ProjectStatus;
  projectId: string;
}) => {
  const onChange = async (status: string) => {
    const promise = async () => {
      await changeProjectStatus(projectId, status);
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    };

    toast.promise(promise, {
      loading: "Changing status...",
      success: "Status changed",
      error: "Failed to change status",
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "px-4 py-2 flex items-center gap-2 rounded-lg text-sm font-medium transition",
            {
              "bg-status-new/10 hover:bg-status-new/20": status === "new",
              "bg-status-proposal-sent/10 hover:bg-status-proposal-sent/20":
                status === "proposal_sent",
              "bg-status-in-progress/10 hover:bg-status-in-progress/20":
                status === "in_progress",
              "bg-status-in-review/10 hover:bg-status-in-review/20":
                status === "in_review",
            }
          )}
        >
          <div
            className={cn("size-1.5 rounded-full", {
              "bg-status-new": status === "new",
              "bg-status-proposal-sent": status === "proposal_sent",
              "bg-status-in-progress": status === "in_progress",
              "bg-status-in-review": status === "in_review",
            })}
          />
          {formatStatus(status)}
          <ChevronDown className="ml-2 size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44" align="end">
        <DropdownMenuLabel>Change status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={status} onValueChange={onChange}>
          {projectStatus.map((status) => (
            <DropdownMenuRadioItem key={status} value={status}>
              {formatStatus(status)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProjectStatusDropdown;
