"use server";

import { getCurrentSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { clients } from "@/lib/db/schemas";
import { and, eq, ilike, inArray } from "drizzle-orm";

export const searchClients = async ({
  query,
  page,
}: {
  query: string;
  page: number;
}) => {
  const { user, organizationId } = await getCurrentSession();

  if (!user) {
    return [];
  }

  if (!organizationId) {
    return [];
  }

  console.log("searchClients", query, page);

  const data = await db
    .select({
      id: clients.id,
      name: clients.name,
    })
    .from(clients)
    .where(
      and(
        eq(clients.archived, false),
        ilike(clients.name, `%${query}%`),
        eq(clients.organizationId, organizationId)
      )
    )
    .limit(6)
    .offset(page * 6);

  return data;
};

export const getClientById = async (id: string) => {
  const { organizationId, user } = await getCurrentSession();

  if (!user) {
    return null;
  }

  if (!organizationId) {
    return null;
  }

  const data = await db.query.clients.findFirst({
    where: and(
      eq(clients.archived, false),
      eq(clients.id, id),
      eq(clients.organizationId, organizationId)
    ),
  });

  return data;
};

export const getClientsByIds = async (ids: string[]) => {
  const { organizationId, user } = await getCurrentSession();

  if (!user) {
    return null;
  }

  if (!organizationId) {
    return null;
  }

  const data = await db.query.clients.findMany({
    where: and(
      eq(clients.archived, false),
      inArray(clients.id, ids),
      eq(clients.organizationId, organizationId)
    ),
  });

  return data;
};
