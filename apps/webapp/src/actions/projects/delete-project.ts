"use server";

import { getCurrentSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schemas";
import { and, eq } from "drizzle-orm";

export const deleteProject = async (id: string) => {
  const { session, organizationId } = await getCurrentSession();

  if (!session) {
    return {
      success: false,
      error: "Not authenticated",
    };
  }

  if (!organizationId) {
    return {
      success: false,
      error: "No active organization",
    };
  }

  await db
    .delete(projects)
    .where(
      and(eq(projects.id, id), eq(projects.organizationId, organizationId))
    );
};
