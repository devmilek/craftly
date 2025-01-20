"use client";

import React from "react";
import { Todo } from "../page";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { cn } from "@/lib/utils";

const KanbanBoard = ({ data }: { data: Todo[] }) => {
  const [activeTodo, setActiveTodo] = React.useState<Todo | null>(null);
  const onDragStart = (e: DragStartEvent) => {
    const data = e.active.data.current as Todo;
    setActiveTodo(data);
  };

  const onDragEnd = (e: DragEndEvent) => {
    setActiveTodo(null);
  };
  return (
    <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className="grid grid-cols-2 gap-4">
        <Column title="To Do" tasks={data.filter((task) => !task.completed)} />
        <Column
          title="Completed"
          tasks={data.filter((task) => task.completed)}
        />
      </div>
      <DragOverlay>
        {activeTodo && <DraggableTask task={activeTodo} />}
      </DragOverlay>
    </DndContext>
  );
};

const Column = ({ title, tasks }: { title: string; tasks: Todo[] }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: title,
  });
  return (
    <div
      className={cn(
        "bg-foreground/5 p-8 border rounded-xl",
        isOver && "bg-foreground/10"
      )}
    >
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div ref={setNodeRef} className="relative max-h-[600px] overflow-y-auto">
        {tasks.map((task) => (
          <DraggableTask key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

const DraggableTask = ({ task }: { task: Todo }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: task,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      key={task.id}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-foreground/10 p-4 mb-2 rounded z-50"
    >
      {task.title}
    </div>
  );
};

export default KanbanBoard;
