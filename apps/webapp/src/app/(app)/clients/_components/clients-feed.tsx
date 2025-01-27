"use client";

import { ClientCard, ClientCardSkeleton } from "@/components/cards/client-card";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getClients } from "../actions";
import { useSearchParams } from "next/navigation";
import { parseAsBoolean, useQueryState } from "nuqs";
import EmptyState from "@/components/ui/empty-state";
import { UserX } from "lucide-react";

const ClientsFeed = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [archived] = useQueryState(
    "archived",
    parseAsBoolean.withDefault(false)
  );

  const { data, isLoading } = useQuery({
    queryKey: ["clients", query, archived],

    queryFn: async () => getClients(query, archived),
  });

  return (
    <>
      <div className="grid grid-cols-3 gap-4 py-6">
        {data?.map((client) => <ClientCard key={client.id} client={client} />)}
        {isLoading && (
          <>
            {Array.from({ length: 4 }).map((_, i) => (
              <ClientCardSkeleton key={i} />
            ))}
          </>
        )}
      </div>
      {!data?.length && !isLoading && (
        <EmptyState
          icon={UserX}
          title="No clients"
          description="Get started by creating a new client."
        />
      )}
    </>
  );
};

export default ClientsFeed;
