"use server";

import { headers } from "next/headers";
import { auth } from ".";
import { and, eq, isNotNull } from "drizzle-orm";
import { db } from "../db";
import { members, sessions } from "../db/schemas";
import { redirect } from "next/navigation";

export const getCurrentSession = async () => {
  const data = await auth.api.getSession({
    headers: await headers(),
  });

  if (!data) {
    return {
      user: null,
      session: null,
      organizationId: null,
    };
  }

  return {
    user: data.user,
    session: data.session,
    organizationId: data.session.activeOrganizationId,
  };
};

export const ensureSessionWithOrganization = async () => {
  const data = await auth.api.getSession({
    headers: await headers(),
  });

  if (!data) {
    redirect("/auth/sign-in");
  }

  if (!data.session.activeOrganizationId) {
    redirect("/auth/select-organization");
  }

  return {
    user: data.user,
    session: data.session,
    organizationId: data.session.activeOrganizationId,
  };
};

// export const ensureServerAction = async () => {
//   const data = await auth.api.getSession({
//     headers: await headers(),
//   });

//   if (!data) {
//     return {
//       success: false,
//       error: "Not authenticated",
//     };
//   }

//   if (!data.session.activeOrganizationId) {
//     return {
//       success: false,
//       error: "No active organization",
//     };
//   }

//   return {
//     user: data.user,
//     session: data.session,
//     organizationId: data.session.activeOrganizationId,
//   };
// };

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
