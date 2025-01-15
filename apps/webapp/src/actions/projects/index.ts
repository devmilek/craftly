"use server";

import { getCurrentSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schemas";
import { and, desc, eq, ilike } from "drizzle-orm";

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

export const searchProjects = async (query: string) => {
  const { user, organizationId } = await getCurrentSession();

  if (!user) {
    return [];
  }

  if (!organizationId) {
    return [];
  }

  const data = await db.query.projects.findMany({
    where: and(
      ilike(projects.name, `%${query}%`),
      eq(projects.organizationId, organizationId),
      eq(projects.archived, false)
    ),
    limit: 5,
  });

  return data;
};

export const getProjectById = async (id: string) => {
  const { organizationId, user } = await getCurrentSession();

  if (!user) {
    return null;
  }

  if (!organizationId) {
    return null;
  }

  const data = await db.query.projects.findFirst({
    where: and(
      eq(projects.archived, false),
      eq(projects.id, id),
      eq(projects.organizationId, organizationId)
    ),
  });

  return data;
};
