"use server";

import { getCurrentSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { clients, projects } from "@/lib/db/schemas";
import { and, eq, ilike } from "drizzle-orm";

export const searchProjects = async (query: string, page: number) => {
  const { user, organizationId } = await getCurrentSession();

  if (!user || !organizationId) {
    return [];
  }

  const data = await db
    .select({
      id: projects.id,
      name: projects.name,
      clientName: clients.name,
    })
    .from(projects)
    .where(
      and(
        ilike(projects.name, `%${query}%`),
        eq(projects.organizationId, organizationId),
        eq(projects.archived, false)
      )
    )
    .leftJoin(clients, eq(projects.clientId, clients.id))
    .limit(10)
    .offset(page * 10);

  return data;
};

export const getProjectById = async (id: string) => {
  const { user, organizationId } = await getCurrentSession();

  if (!user || !organizationId) {
    return null;
  }

  const data = await db
    .select({
      id: projects.id,
      name: projects.name,
      clientName: clients.name,
    })
    .from(projects)
    .where(
      and(
        eq(projects.id, id),
        eq(projects.organizationId, organizationId),
        eq(projects.archived, false)
      )
    )
    .leftJoin(clients, eq(projects.clientId, clients.id));

  return data[0];
};
