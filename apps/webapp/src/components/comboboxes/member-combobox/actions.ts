"use server";

import { getCurrentSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { members, users } from "@/lib/db/schemas";
import { and, eq, ilike, or } from "drizzle-orm";

export const searchMembers = async (query: string, page: number) => {
  const { user, organizationId } = await getCurrentSession();

  if (!user || !organizationId) {
    return [];
  }

  const data = await db
    .select({
      id: members.id,
      email: users.email,
      name: users.name,
      userId: users.id,
      userImage: users.image,
    })
    .from(members)
    .where(
      and(
        or(ilike(users.id, `%${query}%`), ilike(users.email, `%${query}%`)),
        eq(members.organizationId, organizationId)
      )
    )
    .innerJoin(users, eq(members.userId, users.id))
    .limit(10)
    .offset(page * 10);

  return data;
};

export const getMemberById = async (id: string) => {
  const { user, organizationId } = await getCurrentSession();

  if (!user || !organizationId) {
    return null;
  }

  const data = await db
    .select({
      id: members.id,
      email: users.email,
      name: users.name,
      userId: users.id,
      userImage: users.image,
    })
    .from(members)
    .where(and(eq(members.id, id), eq(members.organizationId, organizationId)))
    .innerJoin(users, eq(members.userId, users.id));

  return data[0];
};
