import { useDraggable } from "@dnd-kit/core";
import TaskCard from "./task-card";
import { cn } from "@/lib/utils";
import { Task } from "@/lib/db/schemas";

export const DraggableCard = ({ task }: { task: Task }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task.id,
    data: task,
  });

  return (
    <>
      <div
        className={cn("relative", {
          "opacity-0": isDragging,
        })}
        onClick={() => console.log(`Clicked on task ${task.id}`)}
        {...attributes}
        {...listeners}
        suppressHydrationWarning
        ref={setNodeRef}
      >
        <TaskCard
          name={task.name}
          dueDate={task.dueDate}
          status={task.status}
          priority={task.priority}
        />
      </div>
    </>
  );
};
