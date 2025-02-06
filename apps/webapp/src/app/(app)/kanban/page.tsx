import { db } from "@/lib/db";
import React from "react";
import KanbanView from "./kanban-view";
import { ensureSessionWithOrganization } from "@/lib/auth/utils";
import { and, eq, isNotNull } from "drizzle-orm";
import { projects, subtasks, tasks, users } from "@/lib/db/schemas";
import SidebarNavbar from "@/components/global/sidebar/sidebar-navbar";

const KanbanPage = async () => {
  const { organizationId } = await ensureSessionWithOrganization();
  const data = await db
    .select({
      id: tasks.id,
      name: tasks.name,
      status: tasks.status,
      priority: tasks.priority,
      dueDate: tasks.dueDate,
      projectId: tasks.projectId,
      projectName: projects.name,
      assigneeId: tasks.assigneeId,
      assigneeName: users.name,
      assigneeImage: users.image,
      subtasksCount: db.$count(subtasks, eq(subtasks.taskId, tasks.id)),
      doneSubtasksCount: db.$count(
        subtasks,
        and(eq(subtasks.taskId, tasks.id), isNotNull(subtasks.completed))
      ),
    })
    .from(tasks)
    .leftJoin(projects, eq(tasks.projectId, projects.id))
    .leftJoin(users, eq(tasks.assigneeId, users.id))
    .where(and(eq(tasks.organizationId, organizationId)))
    .orderBy(tasks.updatedAt)
    .limit(50);

  return (
    <div>
      <SidebarNavbar
        items={[
          {
            label: "Tasks",
          },
        ]}
      />
      <h1 className="text-2xl font-semibold mb-4">Tasks</h1>
      <KanbanView tasks={data} />
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
};

export default KanbanPage;
