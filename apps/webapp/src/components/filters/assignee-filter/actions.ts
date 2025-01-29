"use server";

import { getCurrentSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { members, users } from "@/lib/db/schemas";
import { and, eq, ilike, inArray, or } from "drizzle-orm";

export const getOrgMembers = async ({
  page,
  query,
}: {
  page: number;
  query?: string | null;
}) => {
  const { organizationId, session } = await getCurrentSession();

  if (!session || !organizationId) {
    return [];
  }

  const data = await db
    .select({
      id: members.id,
      name: users.name,
      email: users.email,
    })
    .from(members)
    .where(
      and(
        eq(members.organizationId, organizationId),
        query
          ? or(
              ilike(users.name, `%${query}%`),
              ilike(users.email, `%${query}%`)
            )
          : undefined
      )
    )
    .leftJoin(users, eq(members.userId, users.id))
    .limit(10)
    .offset(page * 10);

  return data;
};

export const getOrgMembersByIds = async (ids: string[]) => {
  const { organizationId, session } = await getCurrentSession();

  if (!session || !organizationId) {
    return [];
  }

  const data = await db
    .select({
      id: members.id,
      name: users.name,
      email: users.email,
    })
    .from(members)
    .where(
      and(eq(members.organizationId, organizationId), inArray(members.id, ids))
    )
    .leftJoin(users, eq(members.userId, users.id));

  return data;
};
