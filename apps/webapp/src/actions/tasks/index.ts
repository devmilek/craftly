"use server";

import { getCurrentSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { tasks } from "@/lib/db/schemas";
import { and, eq, ilike } from "drizzle-orm";

export const searchTasks = async (query: string, projectId?: string) => {
  const { user, organizationId } = await getCurrentSession();

  if (!user) {
    return [];
  }

  if (!organizationId) {
    return [];
  }

  const data = await db.query.tasks.findMany({
    where: and(
      ilike(tasks.name, `%${query}%`),
      eq(tasks.organizationId, organizationId),
      projectId ? eq(tasks.projectId, projectId) : undefined
    ),
    limit: 5,
  });

  return data;
};

export const getTaskById = async (id: string) => {
  const { organizationId, user } = await getCurrentSession();

  if (!user) {
    return null;
  }

  if (!organizationId) {
    return null;
  }

  const data = await db.query.tasks.findFirst({
    where: and(eq(tasks.id, id), eq(tasks.organizationId, organizationId)),
  });

  return data;
};
