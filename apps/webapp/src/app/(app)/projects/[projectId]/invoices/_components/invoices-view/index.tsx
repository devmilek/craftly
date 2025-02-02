"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getInvoices } from "../../actions";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { InvoicesChart } from "./invoices-chart";

const InvoicesView = ({ projectId }: { projectId?: string }) => {
  const { data } = useQuery({
    queryKey: ["invoices", projectId],
    queryFn: async () => await getInvoices({}),
  });

  const formatter = new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  });

  return (
    <div className="flex gap-8">
      <div className="grid gap-2 w-full">
        {data?.invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="flex items-center border rounded-lg overflow-hidden"
          >
            <div
              className={cn(
                "flex flex-col items-center aspect-square bg-accent flex-shrink-0 size-16 justify-center border-r leading-none",
                {
                  "text-green-700 bg-green-100": invoice.paid,
                  "bg-destructive":
                    invoice.dueDate < new Date() && !invoice.paid,
                }
              )}
            >
              <p className="text-sm">{format(invoice.createdAt, "LLL")}</p>
              <p className="text-lg font-medium">
                {format(invoice.createdAt, "d")}
              </p>
            </div>
            <div className="flex-1 flex justify-between items-center px-4">
              <div>
                <p className="font-medium">{invoice.name}</p>
                <p className="text-sm text-muted-foreground">
                  Due {format(invoice.dueDate, "PPP")}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-semibold text-sm">
                  {formatter.format(Number(invoice.amount))}
                </p>
                <Button size="icon" variant="outline">
                  <MoreVertical />
                </Button>
              </div>
            </div>
          </div>
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
