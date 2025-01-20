import React from "react";
import KanbanBoard from "./_components/kanban-board";

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const KanbanPage = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data: Todo[] = await res.json();

  return (
    <div>
      <h1 className="text-2xl mt-3 mb-8 font-bold">Kanban</h1>
      <KanbanBoard data={data} />
    </div>
  );
};

export default KanbanPage;
