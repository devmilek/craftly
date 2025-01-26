"use server";

import { getCurrentSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { files } from "@/lib/db/schemas";
import { and, desc, eq } from "drizzle-orm";

export const getRecentFiles = async (projectId: string) => {
  const { organizationId, session } = await getCurrentSession();

  if (!session || !organizationId || !projectId) {
    return [];
  }

  const data = await db.query.files.findMany({
    where: and(
      eq(files.organizationId, organizationId),
      eq(files.projectId, projectId)
    ),
    limit: 5,
    orderBy: desc(files.updatedAt),
  });

  return data;
};
