"use server";

import { getCurrentSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { clients, members, users } from "@/lib/db/schemas";
import { and, eq, ilike, inArray, or } from "drizzle-orm";

export const searchMembers = async (query: string) => {
  const { user, organizationId } = await getCurrentSession();

  if (!user) {
    return [];
  }

  if (!organizationId) {
    return [];
  }

  const data = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
    })
    .from(members)
    .where(
      and(
        eq(members.organizationId, organizationId),
        or(ilike(users.name, `%${query}%`), ilike(users.email, `%${query}%`))
      )
    )
    .innerJoin(users, eq(members.userId, users.id));

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
