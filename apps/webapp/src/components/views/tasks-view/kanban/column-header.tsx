import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn, formatStatus } from "@/lib/utils";
import React from "react";

const ColumnHeader = ({
  status,
  count,
}: {
  status: string;
  count?: number;
}) => {
  const getColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-status-new";
      case "proposal_sent":
        return "bg-status-proposal-sent";
      case "in_progress":
        return "bg-status-in-progress";
      case "in_review":
        return "bg-status-in-review";
      case "completed":
        return "bg-status-completed";
      case "todo":
        return "bg-status-todo";
    }
  };

  return (
    <header className="rounded">
      <div className="flex items-center gap-3 mb-3">
        <div
          className={cn("size-2 rounded-full bg-border", getColor(status))}
        />
        <h1 className="text-lg font-semibold capitalize">
          {formatStatus(status)}
        </h1>
        {count && <Badge variant="secondary">{count}</Badge>}
      </div>
      <Separator className={cn("h-0.5 rounded-xl", getColor(status))} />
    </header>
  );
};

export default ColumnHeader;
