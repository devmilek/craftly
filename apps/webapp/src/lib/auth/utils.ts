"use server";

import { headers } from "next/headers";
import { auth } from ".";

export const getCurrentSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session) {
    return {
      user: null,
      session: null,
    };
  }

  return session;
};

import { and, eq, isNotNull } from "drizzle-orm";
import { db } from "../db";
import { members, sessions } from "../db/schemas";

export const getActiveOrganization = async ({
  sessionId,
  userId,
}: {
  sessionId: string;
  userId: string;
}) => {
  const session = await db.query.sessions.findFirst({
    where: and(
      eq(sessions.id, sessionId),
      isNotNull(sessions.activeOrganizationId)
    ),
  });

  if (session) {
    return session.activeOrganizationId;
  }

  const orgs = await db.query.members.findMany({
    where: and(eq(members.userId, userId), eq(members.role, "owner")),
  });

  if (orgs) {
    return orgs[0].organizationId;
  }
};
