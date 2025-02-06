import React from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import ColumnHeader from "./column-header";
import { useDroppable } from "@dnd-kit/core";
import Card, { TaskCardTask } from "./card";
import { cn } from "@/lib/utils";

const Column = ({
  status,
  tasks,
}: {
  status: string;
  tasks: TaskCardTask[];
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div className="min-w-72 w-full flex flex-col h-full py-6">
      <ColumnHeader status={status} count={tasks.length} />
      <ScrollArea.Root className="flex-1 relative overflow-hidden">
        <div
          className={cn(
            "h-6 bg-gradient-to-b from-background to-background/0 w-full absolute top-0 z-10",
            {
              "bg-background": isOver,
            }
          )}
        />
        <ScrollArea.Viewport className="h-full w-full rounded-xl overflow-hidden">
          <div ref={setNodeRef} className="py-6 space-y-2">
            {tasks.map((task) => (
              <Card key={task.id} task={task} />
            ))}
          </div>
        </ScrollArea.Viewport>
        <div
          className={cn(
            "h-6 bg-gradient-to-t from-background to-background/0 w-full absolute bottom-0 z-10",
            {
              "bg-background": isOver,
            }
          )}
        />
        {/* DRAG OVERLAY */}
        <div
          className={cn(
            "absolute size-full z-20 top-0 py-6 pointer-events-none transition-opacity",
            { "opacity-0": !isOver }
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
        <ScrollArea.Scrollbar
          className="flex touch-none select-none p-0.5 transition-colors absolute top-0 right-0 bottom-0 w-2.5"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="relative flex-1 rounded-full bg-zinc-300" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  );
};

export default Column;
