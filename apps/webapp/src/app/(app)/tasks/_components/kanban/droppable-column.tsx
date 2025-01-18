import { Button } from "@/components/ui/button";
import ColumnHeader from "./column-header";
import { DraggableCard } from "./draggable-card";
import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import { useModal } from "@/hooks/use-modals-store";
import { Task } from ".";

export const DroppableColumn = ({
  id,
  title,
  tasks,
}: {
  id: string;
  title: string;
  tasks: Task[];
}) => {
  const { onOpen } = useModal("create-task");
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div>
      <ColumnHeader status={title} count={tasks.length} />
      <div ref={setNodeRef} className="relative min-h-96">
        <div className="space-y-4">
          {tasks.map((task) => (
            <DraggableCard key={task.id} task={task} />
          ))}
          {tasks.length === 0 && (
            <Button className="w-full" variant="secondary" onClick={onOpen}>
              Add a task
            </Button>
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
