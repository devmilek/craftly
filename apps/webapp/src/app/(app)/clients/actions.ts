"use server";

import { getCurrentSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { avatars, clients, projects } from "@/lib/db/schemas";
import {
  and,
  countDistinct,
  eq,
  getTableColumns,
  ilike,
  sql,
} from "drizzle-orm";

export const getClients = async (query: string | null, archived: boolean) => {
  const { organizationId, session } = await getCurrentSession();

  if (!session || !organizationId) {
    return [];
  }

  const data = await db
    .select({
      ...getTableColumns(clients),
      avatarSrc: avatars.url,
      projectsCount: countDistinct(projects.id),
      doneProjectsCount: sql<number>`count(distinct CASE WHEN ${projects.completed} = true THEN ${projects.id} END)`,
    })
    .from(clients)
    .where(
      and(
        eq(clients.organizationId, organizationId),
        eq(clients.archived, archived),
        query ? ilike(clients.name, `%${query}%`) : undefined
      )
    )
    .leftJoin(projects, eq(projects.clientId, clients.id))
    .leftJoin(avatars, eq(avatars.id, clients.avatarId))
    .groupBy(clients.id, avatars.url);

  return data;
};
