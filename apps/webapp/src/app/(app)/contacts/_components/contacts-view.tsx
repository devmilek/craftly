"use client";

import React from "react";
import { countTableContacts } from "./data-table/actions";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import DataTable from "./data-table";
import TablePagination from "./table-pagination";

const ContactsView = () => {
  const searchParams = useSearchParams();

  const query = searchParams.get("query") || "";
  const clientsParams = searchParams.get("clients") || "";
  const clientsIds = (searchParams.get("clients") || "")
    .split(",")
    .filter((id) => id !== "");

  const { data, isLoading } = useQuery({
    queryKey: ["contacts", "contacts_count", query.trim(), clientsParams],
    queryFn: async () =>
      await countTableContacts({
        clientsIds,
        query: query,
      }),
  });

  return (
    <div>
      <DataTable />
      {!isLoading && (
        <TablePagination itemsCount={data || 0} itemsPerPage={10} />
      )}
    </div>
  );
};

export default ContactsView;
