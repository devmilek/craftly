import React from "react";
import KanbanBoard from "./_components/kanban-board";
import { db } from "@/lib/db";
import { taskAssignees, tasks } from "@/lib/db/schemas";
import { eq, sql } from "drizzle-orm";

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const KanbanPage = async () => {
  const tasksData = await db
    .select({
      id: tasks.id,
      name: tasks.name,
      assignees: sql<string[]>`json_agg(${taskAssignees.memberId})`,
    })
    .from(tasks)
    .leftJoin(taskAssignees, eq(tasks.id, taskAssignees.taskId))
    .groupBy(tasks.id)
    .limit(10);

  const taskAssigneesOneData = await db
    .select()
    .from(taskAssignees)
    .limit(10)
    .where(eq(taskAssignees.taskId, "00640bf9-eb26-4a6d-845e-62b707af6b39"));

  const tasksQuerySelect = await db.query.tasks.findMany({
    with: {
      assignees: {
        with: {
          member: {
            with: {
              user: true,
            },
          },
        },
      },
    },
    where: eq(tasks.id, "00640bf9-eb26-4a6d-845e-62b707af6b39"),
    limit: 10,
  });
  return (
    <div>
      <h1 className="text-2xl mt-3 mb-8 font-bold">Kanban</h1>
      <div className="grid grid-cols-2">
        <div>
          <p>Tasks</p>
          <pre className="overflow-auto">
            <code>{JSON.stringify(tasksData, null, 2)}</code>
          </pre>
        </div>
        <div>
          <p>Task Assignees</p>
          <pre className="overflow-auto">
            <code>{JSON.stringify(tasksQuerySelect, null, 2)}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default KanbanPage;
