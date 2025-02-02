"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { getChartTimeTrackings } from "../actions";
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { parseAsIsoDate, parseAsStringLiteral, useQueryState } from "nuqs";
import { fromZonedTime, toZonedTime } from "date-fns-tz";
import { formatSeconds } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

const chartConfig = {
  time: {
    label: "Time",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function TimeChart() {
  const [by] = useQueryState(
    "by",
    parseAsStringLiteral(["month", "week"]).withDefault("month")
  );
  const [from] = useQueryState(
    "from",
    parseAsIsoDate.withDefault(
      // Konwertuj domyślną datę na UTC przed zapisaniem
      fromZonedTime(
        by === "month" ? startOfMonth(new Date()) : startOfWeek(new Date()),
        "UTC"
      )
    )
  );
  const { data, isLoading } = useQuery({
    queryKey: ["timeTrackings", from, by],
    queryFn: async () =>
      await getChartTimeTrackings({
        from,
        groupBy: by,
      }),
    select: (data) => {
      const startDate = toZonedTime(new Date(from), "UTC");
      const endDate =
        by === "month" ? endOfMonth(startDate) : endOfWeek(startDate);

      // Generuj wszystkie daty dla okresu (miesiąc lub tydzień)
      const allDates = eachDayOfInterval({ start: startDate, end: endDate });

      // Scal dane z API z wszystkimi datami, uzupełniając brakujące daty wartością time: 0
      const filledData = allDates.map((date) => {
        const existingData = data.find((d) => {
          // Konwertuj datę z API na lokalną strefę czasową przed porównaniem
          const apiDate = toZonedTime(new Date(d.date), "UTC");
          return isSameDay(apiDate, date);
        });
        return {
          date: fromZonedTime(date, "UTC").toISOString(), // Konwertuj datę z powrotem na UTC
          time: existingData ? existingData.time : 0,
        };
      });

      return filledData;
    },
  });

  // depending on "by" value fix the missing date values
  // because the server does not return empty dates

  // do this
  // if by === "month" then add missing dates for the month
  // if by === "week" then add missing dates for the week

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          Time Tracking{" "}
          {isLoading && <Loader2Icon className="size-3 animate-spin ml-2" />}
        </CardTitle>
        <CardDescription>Time spent on tasks by month</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={data || []}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={16}
              tickFormatter={(value) => {
                const date = new Date(value);
                return format(date, "MMM d");
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  indicator="line"
                  labelFormatter={(_, payload) => {
                    if (payload && payload[0]) {
                      const date = new Date(payload[0].payload.date);
                      return format(date, "MMM d, yyyy");
                    }
                    return "adfvadfv";
                  }}
                  formatter={(value, name) => (
                    <div className="flex min-w-[130px] items-center text-xs text-muted-foreground">
                      {chartConfig[name as keyof typeof chartConfig]?.label ||
                        name}
                      <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                        {formatSeconds(Number(value))}
                      </div>
                    </div>
                  )}
                />
              }
            />
            <Bar
              dataKey="time"
              type="natural"
              fill="var(--color-time)"
              // fillOpacity={0.4}
              radius={[4, 4, 0, 0]}
              stroke="var(--color-time)"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
