"use server";

import { getCurrentSession } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { clients, contacts, files } from "@/lib/db/schemas";
import { and, count, eq, getTableColumns, ilike, inArray } from "drizzle-orm";

export const getTableContacts = async ({
  clientsIds,
  query,
  page,
}: {
  clientsIds: string[];
  query: string;
  page: number;
}) => {
  const { session, organizationId } = await getCurrentSession();

  if (!session) {
    return [];
  }

  if (!organizationId) {
    return [];
  }

  const ITEMS_PER_PAGE = 10;

  const data = await db
    .select({
      ...getTableColumns(contacts),
      clientName: clients.name,
      avatarSrc: files.r2Url,
    })
    .from(contacts)
    .where(
      and(
        eq(contacts.organizationId, organizationId),
        clientsIds.length > 0
          ? inArray(contacts.clientId, clientsIds)
          : undefined,
        query ? ilike(contacts.name, `%${query}%`) : undefined
      )
    )
    .leftJoin(clients, eq(contacts.clientId, clients.id))
    .leftJoin(files, eq(contacts.avatarId, files.id))
    .orderBy(contacts.updatedAt)
    .limit(ITEMS_PER_PAGE)
    .offset((page - 1) * ITEMS_PER_PAGE);

  return data;
};

export const countTableContacts = async ({
  clientsIds,
  query,
}: {
  clientsIds: string[];
  query: string;
}) => {
  const { session, organizationId } = await getCurrentSession();

  if (!session) {
    return 0;
  }

  if (!organizationId) {
    return 0;
  }

  const [dataCount] = await db
    .select({
      count: count(),
    })
    .from(contacts)
    .where(
      and(
        eq(contacts.organizationId, organizationId),
        clientsIds.length > 0
          ? inArray(contacts.clientId, clientsIds)
          : undefined,
        query ? ilike(contacts.name, `%${query}%`) : undefined
      )
    )
    .leftJoin(clients, eq(contacts.clientId, clients.id))
    .leftJoin(files, eq(contacts.avatarId, files.id));

  return dataCount.count;
};
