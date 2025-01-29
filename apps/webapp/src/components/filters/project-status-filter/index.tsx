"use client";

import { parseAsStringLiteral, useQueryState } from "nuqs";
import { projectStatus } from "@/lib/db/schemas";
import { formatStatus } from "@/lib/utils";
import { ProjectStatus } from "@/types";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";

export const ProjectStatusFilter = () => {
  const [status, setStatus] = useQueryState(
    "status",
    parseAsStringLiteral(projectStatus).withOptions({
      shallow: false,
    })
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-dashed">
          <PlusCircleIcon />
          Status
          {status && (
            <>
              <Separator orientation="vertical" />
              <Badge variant="secondary">{formatStatus(status)}</Badge>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={status || undefined}
          onValueChange={(val) => {
            if (val === status) {
              setStatus(null);
            } else {
              setStatus(val as ProjectStatus);
            }
          }}
        >
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
