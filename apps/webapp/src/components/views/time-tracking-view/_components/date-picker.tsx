"use client";

import * as React from "react";
import { format, isSameDay, subDays } from "date-fns";
import { Calendar as CalendarIcon, PlusIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { parseAsIsoDate, useQueryState } from "nuqs";

const DatePicker = () => {
  const now = new Date();
  const [from, setFrom] = useQueryState("from", parseAsIsoDate);

  const [to, setTo] = useQueryState("to", parseAsIsoDate);

  const dateRange: DateRange = {
    from: from || undefined,
    to: to || undefined,
  };

  const buttons = [
    {
      label: "Today",
      from: now,
      to: now,
    },
    {
      label: "Yesterday",
      from: subDays(now, 1),
      to: subDays(now, 1),
    },
    {
      label: "Last Week",
      from: subDays(now, 7),
      to: now,
    },
    {
      label: "Last Month",
      from: subDays(now, 30),
      to: now,
    },
    {
      label: "All Time",
      from: null,
      to: null,
    },
  ];

  const isButtonActive = (buttonFrom: Date | null, buttonTo: Date | null) => {
    if (!from && !to && !buttonFrom && !buttonTo) return true;
    if (!from || !buttonFrom) return false;

    const fromMatch = isSameDay(from, buttonFrom);
    if (!to && !buttonTo) return fromMatch;
    if (!to || !buttonTo) return false;

    return fromMatch && isSameDay(to, buttonTo);
  };

  const getDateRangeLabel = (from: Date | null, to: Date | null) => {
    const now = new Date();

    if (!from) return "Pick a date";

    // Check for predefined ranges
    if (isSameDay(from, now) && (!to || isSameDay(to, now))) {
      return "Today";
    }

    const yesterday = subDays(now, 1);
    if (isSameDay(from, yesterday) && (!to || isSameDay(to, yesterday))) {
      return "Yesterday";
    }

    const lastWeekStart = subDays(now, 7);
    if (isSameDay(from, lastWeekStart) && (!to || isSameDay(to, now))) {
      return "Last Week";
    }

    const lastMonthStart = subDays(now, 30);
    if (isSameDay(from, lastMonthStart) && (!to || isSameDay(to, now))) {
      return "Last Month";
    }

    // Default date range format
    return to
      ? `${format(from, "LLL dd, y")} - ${format(to, "LLL dd, y")}`
      : format(from, "LLL dd, y");
  };

  return (
    <div className="flex items-center justify-between">
      <div className={cn("flex items-center gap-2")}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "justify-start text-left font-normal min-w-60",
                !from && !to && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {from ? (
                to ? (
                  <>{getDateRangeLabel(from, to)}</>
                ) : (
                  format(from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 flex" align="start">
            <div className="py-4 px-2 w-40 flex flex-col gap-1 border-r">
              {buttons.map((button) => (
                <Button
                  key={button.label}
                  className="text-start justify-start"
                  variant={
                    isButtonActive(button.from, button.to)
                      ? "secondary"
                      : "ghost"
                  }
                  onClick={() => {
                    setFrom(button.from);
                    setTo(button.to);
                  }}
                >
                  {button.label}
                </Button>
              ))}
            </div>
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={from || now}
              selected={dateRange}
              onSelect={(date) => {
                if (!date) {
                  return;
                }

                if (date.from) {
                  setFrom(date.from);
                }

                if (date.to) {
                  setTo(date.to);
                }
              }}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
      <Button>
        Add Time <PlusIcon className="size-4" />
      </Button>
    </div>
  );
};

export default DatePicker;
