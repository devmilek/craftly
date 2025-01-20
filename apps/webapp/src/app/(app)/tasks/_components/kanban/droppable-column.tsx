import { Button } from "@/components/ui/button";
import ColumnHeader from "./column-header";
import { DraggableCard } from "./draggable-card";
import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import { useModal } from "@/hooks/use-modals-store";
import { TaskStatus } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getTasksByStatus } from "../../actions";
import { Loader2Icon } from "lucide-react";

export const DroppableColumn = ({
  id,
  status,
}: {
  id: string;
  status: TaskStatus;
}) => {
  const { onOpen } = useModal("create-task");
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["tasks", status],
    queryFn: async () => await getTasksByStatus(status),
  });

  return (
    <div className="">
      <ColumnHeader status={status} count={data?.length} />
      <div
        ref={setNodeRef}
        className={cn(
          "relative min-h-96 max-h-[calc(100vh-16rem)] overflow-y-auto"
        )}
      >
        <div className="space-y-4">
          {data?.map((task) => <DraggableCard key={task.id} task={task} />)}
          {data?.length === 0 && (
            <Button className="w-full" variant="secondary" onClick={onOpen}>
              Add a task
            </Button>
          )}
          {isLoading && (
            <div className="flex items-center justify-center h-40 text-muted-foreground">
              <Loader2Icon className="size-4 animate-spin" />
            </div>
          )}
        </div>
        <div
          className={cn(
            "absolute w-full rounded-xl h-full text-center z-10 bg-muted/70 top-0 left-0 flex items-center justify-center gap-2 pointer-events-none",
            {
              "opacity-0": !isOver,
            }
          )}
        >
          <span className="text-sm opacity-70">
            The layout is ordered by <strong>Last Created</strong>
          </span>
        </div>
      </div>
    </div>
  );
};
