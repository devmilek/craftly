"use client";

import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import React from "react";

const TablePagination = ({
  itemsPerPage,
  itemsCount,
}: {
  itemsPerPage: number;
  itemsCount: number;
}) => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const totalPages = Math.ceil(itemsCount / itemsPerPage);

  const handleFirstPage = () => setPage(1);
  const handleLastPage = () => setPage(totalPages);
  const handlePreviousPage = () => setPage(Math.max(1, page - 1));
  const handleNextPage = () => setPage(Math.min(totalPages, page + 1));

  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;

  return (
    <div className="flex justify-between items-center">
      <p className="text-sm text-muted-foreground">
        Showing{" "}
        <strong>
          {itemsPerPage * (page - 1) + 1} -{" "}
          {Math.min(itemsPerPage * page, itemsCount)}
        </strong>{" "}
        of <strong>{itemsCount}</strong> items
      </p>
      <div className="flex gap-4 items-center justify-end mt-4 mb-8">
        <p className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleFirstPage}
            disabled={isFirstPage}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handlePreviousPage}
            disabled={isFirstPage}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={handleNextPage}
            disabled={isLastPage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleLastPage}
            disabled={isLastPage}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TablePagination;
