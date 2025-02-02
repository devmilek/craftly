"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  addMonths,
  addWeeks,
  endOfWeek,
  format,
  getYear,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { parseAsIsoDate, parseAsString, useQueryState } from "nuqs";
import React from "react";
import { fromZonedTime, toZonedTime } from "date-fns-tz";

const DateSelect = () => {
  const [by, setBy] = useQueryState("by", parseAsString.withDefault("month"));
  const [from, setFrom] = useQueryState(
    "from",
    parseAsIsoDate.withDefault(
      // Konwertuj domyślną datę na UTC przed zapisaniem
      fromZonedTime(
        by === "month" ? startOfMonth(new Date()) : startOfWeek(new Date()),
        "UTC"
      )
    )
  );

  // Konwertuj datę na lokalną strefę czasową
  const localDate = toZonedTime(from, "UTC");

  const navigateDate = (direction: "previous" | "next") => {
    const adjustment = direction === "previous" ? -1 : 1;
    const newDate =
      by === "month"
        ? addMonths(localDate, adjustment)
        : addWeeks(localDate, adjustment);
    const adjustedDate =
      by === "month" ? startOfMonth(newDate) : startOfWeek(newDate);
    // Konwertuj datę z powrotem na UTC przed zapisaniem
    setFrom(fromZonedTime(adjustedDate, "UTC"));
  };

  const displayDate = () => {
    const startDate =
      by === "month" ? startOfMonth(localDate) : startOfWeek(localDate);
    const endDate =
      by === "month"
        ? startOfMonth(addMonths(localDate, 1))
        : endOfWeek(localDate);

    if (getYear(startDate) === getYear(new Date())) {
      return by === "month"
        ? format(startDate, "MMM")
        : `${format(startDate, "MMM d")} - ${format(endDate, "MMM d")}`;
    } else {
      return by === "month"
        ? format(startDate, "MMM yyyy")
        : `${format(startDate, "MMM d, yyyy")} - ${format(endDate, "MMM d, yyyy")}`;
    }
  };

  return (
    <div className="flex items-center gap-6 flex-row-reverse">
      <Tabs
        value={by}
        onValueChange={(val) => {
          setBy(val);
          const newDate =
            val === "month"
              ? startOfMonth(new Date())
              : startOfWeek(new Date());
          // Konwertuj datę na UTC przed zapisaniem
          setFrom(fromZonedTime(newDate, "UTC"));
        }}
      >
        <TabsList>
          <TabsTrigger value="month">Month</TabsTrigger>
          <TabsTrigger value="week">Week</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="size-6"
          onClick={() => navigateDate("previous")}
        >
          <ChevronLeft />
        </Button>
        <p className="text-sm font-semibold">{displayDate()}</p>
        <Button
          variant="outline"
          size="icon"
          className="size-6"
          onClick={() => navigateDate("next")}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default DateSelect;
