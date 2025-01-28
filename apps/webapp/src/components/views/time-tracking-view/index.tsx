"use client";

import React, { useEffect, useRef } from "react";
import DatePicker from "./_components/date-picker";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getTimeTrackingsDates } from "./actions";
import { CalendarX2, Loader2 } from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
import EmptyState from "@/components/ui/empty-state";
import AccordionItem from "./_components/accordion-item";
import { parseAsIsoDate, useQueryStates } from "nuqs";

export interface TimeTracking {
  id: string;
  task: string | null;
  totalSeconds: number;
  userName?: string | null;
}

export interface TimeTrackingDate {
  date: Date;
  totalSeconds: number;
}

const TimeTrackingView = () => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [dateRange] = useQueryStates({
    from: parseAsIsoDate,
    to: parseAsIsoDate,
  });

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["timeTrackings", dateRange.from, dateRange.to],
      queryFn: async ({ pageParam = 0 }) =>
        await getTimeTrackingsDates({
          page: pageParam,
          from: dateRange.from,
          to: dateRange.to,
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage.length === 0) {
          return undefined;
        }
        return lastPageParam + 1;
      },
    });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div>
      <DatePicker />
      <div className="max-w-3xl">
        <Accordion.Root type="multiple" className="grid gap-3 mt-6">
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.map((item) => (
                <AccordionItem key={item.date.toString()} item={item} />
              ))}
            </React.Fragment>
          ))}
        </Accordion.Root>
        {!isLoading && data?.pages[0].length === 0 && (
          <EmptyState
            icon={CalendarX2}
            title="No time trackings found"
            description="You haven't tracked any time yet."
          />
        )}
        <div ref={bottomRef}>
          {isFetchingNextPage && (
            <div className="flex justify-center py-4">
              <Loader2 className="animate-spin size-4" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeTrackingView;
