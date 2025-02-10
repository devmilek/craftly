"use server";

import { getCurrentSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { projects, subtasks, tasks, users } from "@/lib/db/schemas";
import { TaskStatus } from "@/types";
import { and, eq, isNotNull } from "drizzle-orm";

export const getTasksByStatus = async (
  status: TaskStatus,
  page: number,
  projectId?: string
) => {
  const { organizationId, session } = await getCurrentSession();

  if (!session || !organizationId) {
    return [];
  }

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
    .where(
      and(
        eq(tasks.organizationId, organizationId),
        projectId ? eq(tasks.projectId, projectId) : undefined,
        eq(tasks.status, status)
      )
    )
    .orderBy(tasks.updatedAt)
    .limit(10)
    .offset(page * 10);

  return data;
};
