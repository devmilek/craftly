"use server";

import { getCurrentSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { tasks } from "@/lib/db/schemas";
import { TaskStatus } from "@/types";
import { and, desc, eq } from "drizzle-orm";

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

export const getTasksByStatus = async (status: TaskStatus) => {
  const { organizationId, session } = await getCurrentSession();

  if (!session || !organizationId) {
    return [];
  }

  const data = await db.query.tasks.findMany({
    where: and(
      eq(tasks.organizationId, organizationId),
      eq(tasks.status, status)
    ),
    orderBy: desc(tasks.updatedAt),
    limit: 20,
  });

  return data;
};
