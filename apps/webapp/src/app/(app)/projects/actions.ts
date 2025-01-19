"use server";

import { getCurrentSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schemas";
import { and, desc, eq } from "drizzle-orm";

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
