"use server";

import { getCurrentSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { tasks } from "@/lib/db/schemas";
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
