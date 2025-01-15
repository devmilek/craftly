"use server";

import { getCurrentSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { projects, projectStatus } from "@/lib/db/schemas";
import { ProjectStatus } from "@/types";
import { and, eq } from "drizzle-orm";

export const changeProjectStatus = async (
  projectId: string,
  status: string
) => {
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

  if (!projectStatus.includes(status as ProjectStatus)) {
    return {
      success: false,
      error: "Invalid status",
    };
  }

  await db
    .update(projects)
    .set({
      status: status as ProjectStatus,
    })
    .where(
      and(
        eq(projects.organizationId, organizationId),
        eq(projects.id, projectId)
      )
    );
};
