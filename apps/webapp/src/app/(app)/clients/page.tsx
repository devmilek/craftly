import ClientCard from "@/components/cards/client-card";
import SidebarNavbar from "@/components/global/sidebar/sidebar-navbar";
import { ensureSessionWithOrganization } from "@/lib/auth/utils";
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
import { Metadata } from "next";
import React from "react";
import Header from "./_components/header";
import {
  createLoader,
  parseAsBoolean,
  parseAsString,
  SearchParams,
} from "nuqs/server";

export const metadata: Metadata = {
  title: "Clients",
};

const clientsSearchParams = {
  archived: parseAsBoolean.withDefault(false),
  query: parseAsString.withDefault(""),
};

const loadSearchParams = createLoader(clientsSearchParams);

const ClientsPage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const { organizationId } = await ensureSessionWithOrganization();

  const { archived, query } = await loadSearchParams(searchParams);

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
        ilike(clients.name, `%${query}%`)
      )
    )
    .leftJoin(projects, eq(projects.clientId, clients.id))
    .leftJoin(files, eq(files.id, clients.avatarId))
    .groupBy(clients.id, files.r2Url);

  return (
    <>
      <SidebarNavbar
        items={[
          {
            label: "Clients",
          },
        ]}
      />
      <div className="">
        <Header />
        <div className="grid grid-cols-4 gap-4 mt-6">
          {data.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ClientsPage;
