import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import TaskCard, { TaskCardProps } from "@/components/cards/task-card";

export const DraggableCard = ({ task }: { task: TaskCardProps }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task.id,
    data: task,
  });

  return (
    <>
      <div
        className={cn("relative", {
          "opacity-50": isDragging,
        })}
        onClick={() => console.log(`Clicked on task ${task.id}`)}
        {...attributes}
        {...listeners}
        suppressHydrationWarning
        ref={setNodeRef}
      >
        <TaskCard {...task} showStatus={false} />
      </div>
    </>
  );
};
