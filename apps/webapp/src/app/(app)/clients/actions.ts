"use server";

import { getCurrentSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { clients, files, projects } from "@/lib/db/schemas";
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
      avatarSrc: files.r2Url,
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
    .leftJoin(files, eq(files.id, clients.avatarId))
    .groupBy(clients.id, files.r2Url);

  return data;
};
