"use server";

import { getCurrentSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { projects, tasks } from "@/lib/db/schemas";
import { TaskStatus } from "@/types";
import { and, desc, eq, getTableColumns } from "drizzle-orm";

export const getTasks = async () => {
  const { organizationId, session } = await getCurrentSession();

  if (!session || !organizationId) {
    return [];
  }

  const data = await db.query.tasks.findMany({
    where: and(eq(tasks.organizationId, organizationId)),
    orderBy: desc(tasks.updatedAt),
  });

  return data;
};

export const getTasksByStatus = async (status: TaskStatus, page: number) => {
  const { organizationId, session } = await getCurrentSession();

  if (!session || !organizationId) {
    return [];
  }

  const data = await db
    .selectDistinct({
      ...getTableColumns(tasks),
      projectName: projects.name,
    })
    .from(tasks)
    .where(
      and(eq(tasks.organizationId, organizationId), eq(tasks.status, status))
    )
    .leftJoin(projects, eq(tasks.projectId, projects.id))
    .orderBy(desc(tasks.updatedAt))
    .limit(20)
    .offset(page * 20);

  return data;
};

export const setTaskStatus = async (taskId: string, status: TaskStatus) => {
  const { organizationId, session } = await getCurrentSession();

  if (!session || !organizationId) {
    return;
  }

  await db
    .update(tasks)
    .set({ status })
    .where(and(eq(tasks.organizationId, organizationId), eq(tasks.id, taskId)));
};
