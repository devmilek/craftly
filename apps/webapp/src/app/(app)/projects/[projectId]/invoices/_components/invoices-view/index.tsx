"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getInvoices } from "../../actions";
import { InvoicesChart } from "./invoices-chart";
import InvoiceTile from "./invoice-tile";

const InvoicesView = ({ projectId }: { projectId?: string }) => {
  const { data } = useQuery({
    queryKey: ["invoices", projectId],
    queryFn: async () =>
      await getInvoices({
        projectId,
      }),
  });

  return (
    <div className="flex gap-8">
      <div className="grid gap-2 w-full">
        {data?.invoices.map((invoice) => (
          <InvoiceTile key={invoice.id} invoice={invoice} />
        ))}
      </div>
      <div className="w-[500px]">
        <InvoicesChart
          overdue={data?.stats.overdue || 0}
          paid={data?.stats.paid || 0}
          pending={data?.stats.pending || 0}
        />
      </div>
    </div>
  );
};

export default InvoicesView;
