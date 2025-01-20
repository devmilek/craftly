"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Contact } from "@/lib/db/schemas";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo } from "react";
import { columns } from "./colums";
import { useQuery } from "@tanstack/react-query";
import { getTableContacts } from "./actions";
import { Loader2Icon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";

export type ContactsTableProps = Contact & {
  clientName: string | null;
  clientId: string | null;
  avatarSrc: string | null;
};

const DataTable = () => {
  const searchParams = useSearchParams();

  const query = searchParams.get("query") || "";
  const clientsParams = searchParams.get("clients") || "";
  const clientsIds = (searchParams.get("clients") || "")
    .split(",")
    .filter((id) => id !== "");
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));

  const { data: serverData, isLoading } = useQuery({
    queryKey: ["contacts", query.trim(), clientsParams, page],
    queryFn: async () =>
      await getTableContacts({
        clientsIds,
        query: query,
        page,
      }),
  });

  const data = useMemo(() => serverData ?? [], [serverData]);

  const table = useReactTable<ContactsTableProps>({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border mt-4">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    <Loader2Icon className="size-4 animate-spin mx-auto" />
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
