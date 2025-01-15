"use server";

import { getCurrentSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schemas";
import { and, desc, eq } from "drizzle-orm";

export const getSidebarProjects = async () => {
  const { session, organizationId } = await getCurrentSession();

  if (!session) {
    return [];
  }

  if (!organizationId) {
    return [];
  }

  const data = await db.query.projects.findMany({
    where: and(
      eq(projects.organizationId, organizationId),
      eq(projects.archived, false)
    ),
    orderBy: desc(projects.updatedAt),
    limit: 5,
  });

  return data;
};
