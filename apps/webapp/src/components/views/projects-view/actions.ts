"use server";

import { getCurrentSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { clients, projects, tasks } from "@/lib/db/schemas";
import { ProjectStatus } from "@/types";
import { and, countDistinct, desc, eq, sql } from "drizzle-orm";

export const getProjects = async () => {
  const { organizationId, session } = await getCurrentSession();

  if (!session || !organizationId) {
    return [];
  }

  const data = await db.query.projects.findMany({
    where: and(eq(projects.organizationId, organizationId)),
    with: {
      client: true,
    },
    orderBy: desc(projects.updatedAt),
  });

  return data;
};

export async function getProjectsByStatus({
  status,
  page,
}: {
  status: ProjectStatus;
  page: number;
}) {
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
      clientId: projects.clientId,
      clientName: clients.name,
      tasksCount: countDistinct(tasks.id),
      tasksCompleted: sql<number>`count(distinct CASE WHEN ${tasks.status} = 'completed' THEN ${tasks.id} END)`,
    })
    .from(projects)
    .where(
      and(
        eq(projects.organizationId, organizationId),
        eq(projects.status, status)
      )
    )
    .leftJoin(clients, eq(projects.clientId, clients.id))
    .leftJoin(tasks, eq(tasks.projectId, projects.id))
    .groupBy(projects.id, clients.name)
    .orderBy(desc(projects.updatedAt))
    .limit(10)
    .offset(page * 10);

  return data;
}
