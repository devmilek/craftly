"use server";

import { getCurrentSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { clients, projects, tasks } from "@/lib/db/schemas";
import { ProjectStatus } from "@/types";
import { and, asc, desc, eq, ilike, sql } from "drizzle-orm";

export async function getProjects({
  status,
  page,
  query,
}: {
  status?: ProjectStatus;
  query?: string | null;
  page: number;
}) {
  const ITEMS_PER_PAGE = 10;

  const { organizationId, session } = await getCurrentSession();

  if (!session || !organizationId) {
    return [];
  }

  const data = await db
    .select({
      id: projects.id,
      name: projects.name,
      status: projects.status,
      dueDate: projects.dueDate,
      clientId: clients.id,
      clientName: clients.name,
      updatedAt: projects.updatedAt,
      tasksCount: sql<number>`COUNT(${tasks.id})`.as("tasksCount"),
      tasksCompleted:
        sql<number>`SUM(CASE WHEN ${tasks.status} = 'completed' THEN 1 ELSE 0 END)`.as(
          "tasksCompleted"
        ),
    })
    .from(projects)
    .where(
      and(
        eq(projects.organizationId, organizationId),
        status ? eq(projects.status, status) : undefined,
        query ? ilike(projects.name, `%${query}%`) : undefined
      )
    )
    .leftJoin(clients, eq(projects.clientId, clients.id))
    .leftJoin(tasks, eq(tasks.projectId, projects.id))
    .groupBy(projects.id, clients.id)
    .orderBy(desc(projects.updatedAt), asc(projects.id))
    .offset(page * ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE);

  return data;
}

export const updateProjectStatus = async ({
  status,
  projectId,
}: {
  status: ProjectStatus;
  projectId: string;
}) => {
  const { organizationId, session } = await getCurrentSession();

  if (!session || !organizationId) {
    return;
  }

  await db
    .update(projects)
    .set({ status })
    .where(
      and(
        eq(projects.organizationId, organizationId),
        eq(projects.id, projectId)
      )
    );
};
