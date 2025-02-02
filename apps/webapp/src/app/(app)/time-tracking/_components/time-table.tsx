"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import EmptyState from "@/components/ui/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatSeconds, getInitials } from "@/lib/utils";
import { Clock, MoreVertical } from "lucide-react";
import React from "react";

const TimeTable = ({
  data,
}: {
  data?: {
    projectId: string;
    projectName: string;
    clientName: string | null;
    totalEarings: number;
    totalBillableTime: number;
    totalTime: number;
  }[];
}) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <Card className="mt-8">
      {data && data.length > 0 ? (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Total Time</TableHead>
                <TableHead>Total Billable Time</TableHead>
                <TableHead>Total Earnings</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((row) => (
                <TableRow key={row.projectId}>
                  <TableCell className="flex items-center gap-4">
                    <div className="leading-none rounded-lg size-10 border bg-accent flex items-center justify-center text-sm">
                      {getInitials(row.projectName)}
                    </div>
                    <div>
                      <p className="text-base font-medium">{row.projectName}</p>
                      <p className="text-sm text-gray-500">{row.clientName}</p>
                    </div>
                  </TableCell>
                  <TableCell>{formatSeconds(row.totalTime)}</TableCell>
                  <TableCell>{formatSeconds(row.totalBillableTime)}</TableCell>
                  <TableCell>{formatter.format(row.totalEarings)}</TableCell>
                  <TableCell>
                    <Button size="icon" variant="ghost">
                      <MoreVertical />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        <div className="p-8">
          <EmptyState
            icon={Clock}
            title="No time trackings found"
            description="You haven't tracked any time yet."
          />
        </div>
      )}
    </Card>
  );
};

export default TimeTable;
