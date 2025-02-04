"use server";

import { getCurrentSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { tasks } from "@/lib/db/schemas";
import { and, eq } from "drizzle-orm";

export const getTaskById = async (id?: string) => {
  const { organizationId, session } = await getCurrentSession();

  if (!session || !organizationId || !id) {
    return undefined;
  }

  const data = await db.query.tasks.findFirst({
    where: and(eq(tasks.id, id), eq(tasks.organizationId, organizationId)),
  });

  return data;
};
