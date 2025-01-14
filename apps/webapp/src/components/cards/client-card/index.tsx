import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Client } from "@/lib/db/schemas";
import { MoreHorizontal } from "lucide-react";
import React from "react";

const ClientCard = ({ client }: { client: Client }) => {
  return (
    <article className="px-5 py-4 rounded-xl border">
      <div className="flex justify-between">
        <div className="size-9 p-1 border border-dashed rounded-lg bg-background shadow leading-none flex items-center justify-center">
          <div className="font-mono">{client.name[0]}</div>
        </div>
        <Button size="icon" variant="ghost" className="size-6">
          <MoreHorizontal />
        </Button>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <h3 className="text-xl font-semibold">{client.name}</h3>
        <Badge variant="secondary" className="rounded-full">
          {client.archived ? "Archived" : "Active"}
        </Badge>
      </div>
      <Progress className="mt-3" />
      <p className="text-muted-foreground text-sm mt-1">No projects found</p>
    </article>
  );
};

export default ClientCard;
