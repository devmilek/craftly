"use client";

import { format } from "date-fns";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CheckIcon,
  Loader2,
  MoreVertical,
  PenIcon,
  TrashIcon,
  XIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAlertModal } from "@/hooks/use-alert-modal";
import { changeInvoicePaidStatus, removeInvoice } from "@/actions/invoices";
import { toast } from "sonner";
import { queryClient } from "@/components/providers/query-provider";

const InvoiceTile = ({
  invoice,
}: {
  invoice: {
    createdAt: Date;
    dueDate: Date;
    amount: string;
    name: string | null;
    paid: boolean;
    id: string;
  };
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { open } = useAlertModal();
  const handleDelete = () => {
    open({
      title: "Delete invoice",
      description: "Are you sure you want to delete this invoice?",
      onAction: async () => {
        const { error } = await removeInvoice(invoice.id);

        if (error) {
          toast.error(error || "An error occurred");
          return;
        }

        await queryClient.invalidateQueries({
          queryKey: ["invoices"],
        });
      },
      actionLabel: "Delete",
    });
  };

  const hadleChangePaidStatus = async () => {
    setIsLoading(true);
    const { error } = await changeInvoicePaidStatus(invoice.id, !invoice.paid);

    if (error) {
      setIsLoading(false);
      toast.error(error || "An error occurred");
      return;
    }

    await queryClient.invalidateQueries({
      queryKey: ["invoices"],
    });
    setIsLoading(false);
  };

  const formatter = new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  });

  return (
    <div className="flex items-center border rounded-lg overflow-hidden">
      <div
        className={cn(
          "flex flex-col items-center aspect-square bg-accent flex-shrink-0 size-16 justify-center border-r leading-none"
        )}
      >
        <p className="text-sm">{format(invoice.createdAt, "LLL")}</p>
        <p className="text-lg font-medium">{format(invoice.createdAt, "d")}</p>
      </div>
      <div className="flex-1 flex justify-between items-center px-4">
        <div>
          <div className="flex gap-3">
            <p className="font-semibold">{invoice.name}</p>
          </div>
          <p
            className={cn("text-sm text-muted-foreground", {
              "text-destructive": invoice.dueDate < new Date() && !invoice.paid,
            })}
          >
            Due {format(invoice.dueDate, "PPP")}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant={invoice.paid ? "success" : "outline"}>
            {invoice.paid ? "Paid" : "Pending"}
          </Badge>
          <p className="font-semibold text-sm">
            {formatter.format(Number(invoice.amount))}
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline">
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <MoreVertical />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <PenIcon />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={hadleChangePaidStatus}>
                {invoice.paid ? (
                  <>
                    <XIcon />
                    <span>Mark as Unpaid</span>
                  </>
                ) : (
                  <>
                    <CheckIcon />
                    <span>Mark as Paid</span>
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive"
                onClick={handleDelete}
              >
                <TrashIcon />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTile;
