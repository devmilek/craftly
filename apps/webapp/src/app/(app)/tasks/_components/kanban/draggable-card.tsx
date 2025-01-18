import { useDraggable } from "@dnd-kit/core";
import TaskCard from "./task-card";
import { Task } from ".";
import { cn } from "@/lib/utils";

export const DraggableCard = ({ task }: { task: Task }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      className={cn("relative", {
        "opacity-90 z-50": isDragging,
      })}
      onClick={() => console.log(`Clicked on task ${task.id}`)}
      {...attributes}
      {...listeners}
      suppressHydrationWarning
      ref={setNodeRef}
      style={style}
    >
      <TaskCard
        title={task.name}
        dueDate={new Date()}
        filesCount={4}
        priority="medium"
        subtasksCount={9}
        projectName="Customer Onboarding Experience Enhancement"
        status={task.status}
      />
    </div>
  );
};
