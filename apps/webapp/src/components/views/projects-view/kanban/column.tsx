import React from "react";
import ColumnHeader from "../../tasks-view/kanban/column-header";
import { useQuery } from "@tanstack/react-query";
import { ProjectStatus } from "@/types";
import { getProjectsByStatus } from "../actions";
import { useDroppable } from "@dnd-kit/core";
import DraggableCard from "./draggable-card";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const Column = ({ status }: { status: ProjectStatus }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  const { data } = useQuery({
    queryKey: ["tasks", status],
    queryFn: async () =>
      await getProjectsByStatus({
        status,
      }),
  });

  return (
    <div className="min-w-72">
      <ColumnHeader status={status} />

      <div className="relative min-h-96 max-h-[90vh] flex flex-col">
        <div className="h-6 bg-gradient-to-b absolute w-full top-0 from-background z-10 to-background/0" />
        <ScrollArea ref={setNodeRef} className="grid gap-4 relative flex-1">
          <div className="grid gap-4 py-6">
            {data?.map((project) => (
              <DraggableCard key={project.id} project={project} />
            ))}
          </div>
        </ScrollArea>

        <div
          className={cn(
            "absolute py-6 top-0 size-full pointer-events-none opacity-100 transition",
            {
              "opacity-0": !isOver,
            }
          )}
        >
          <div
            className={cn(
              "size-full p-4 bg-muted/70 grid place-items-center backdrop-blur-sm rounded-2xl overflow-hidden border"
            )}
          >
            <span className="text-sm opacity-90">
              The layout is ordered by <strong>Last Updated</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Column;
