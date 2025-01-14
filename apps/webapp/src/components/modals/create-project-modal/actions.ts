"use server";

import { ensureSessionWithOrganization } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { clients } from "@/lib/db/schemas";
import { and, eq, ilike } from "drizzle-orm";

export const searchClients = async (query: string) => {
  const { user, organizationId } = await ensureSessionWithOrganization();

  if (!user) {
    return [];
  }

  if (!organizationId) {
    return [];
  }

  const data = await db.query.clients.findMany({
    where: and(
      eq(clients.archived, false),
      ilike(clients.name, `%${query}%`),
      eq(clients.organizationId, organizationId)
    ),
    limit: 7,
  });

  return data;
};

export const getClientById = async (id: string) => {
  const { organizationId, user } = await ensureSessionWithOrganization();

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
