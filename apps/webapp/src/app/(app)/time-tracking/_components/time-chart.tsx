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
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
} from "date-fns";
import { fromZonedTime, toZonedTime } from "date-fns-tz";
import { formatSeconds } from "@/lib/utils";
import { useMemo } from "react";

const chartConfig = {
  time: {
    label: "Time",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

// const { data, isLoading } = useQuery({
//   queryKey: ["timeTrackingsChart", { from, by }],
//   queryFn: async () =>
//     await getChartTimeTrackings({
//       from,
//       groupBy: by,
//     }),
//   select: (data) => {
//     const startDate = toZonedTime(new Date(from), "UTC");
//     const endDate =
//       by === "month" ? endOfMonth(startDate) : endOfWeek(startDate);

//     // Generuj wszystkie daty dla okresu (miesiąc lub tydzień)
//     const allDates = eachDayOfInterval({ start: startDate, end: endDate });

//     // Scal dane z API z wszystkimi datami, uzupełniając brakujące daty wartością time: 0
//     const filledData = allDates.map((date) => {
//       const existingData = data.find((d) => {
//         // Konwertuj datę z API na lokalną strefę czasową przed porównaniem
//         const apiDate = toZonedTime(new Date(d.date), "UTC");
//         return isSameDay(apiDate, date);
//       });
//       return {
//         date: fromZonedTime(date, "UTC").toISOString(), // Konwertuj datę z powrotem na UTC
//         time: existingData ? existingData.time : 0,
//       };
//     });

//     return filledData;
//   },
// });

export function TimeChart({
  data,
  by,
  from,
}: {
  data?: { date: Date; time: number }[];
  by: "month" | "week";
  from: Date;
}) {
  // Memoize the processed data to avoid unnecessary recalculations
  const processedData = useMemo(() => {
    const startDate = toZonedTime(from, "UTC");
    const endDate =
      by === "month" ? endOfMonth(startDate) : endOfWeek(startDate);

    // Generate all dates for the period (month or week)
    const allDates = eachDayOfInterval({ start: startDate, end: endDate });

    // Merge API data with all dates, filling missing dates with time: 0
    return allDates.map((date) => {
      const existingData = data?.find((d) => {
        // Convert API date to local time zone before comparison
        const apiDate = toZonedTime(new Date(d.date), "UTC");
        return isSameDay(apiDate, date);
      });
      return {
        date: fromZonedTime(date, "UTC").toISOString(), // Convert date back to UTC
        time: existingData ? existingData.time : 0,
      };
    });
  }, [data, by, from]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          Time Tracking{" "}
          {/* {isLoading && <Loader2Icon className="size-3 animate-spin ml-2" />} */}
        </CardTitle>
        <CardDescription>Time spent on tasks by {by}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            data={processedData}
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
                if (by === "month") {
                  return format(date, "MMM d");
                }
                return format(date, "EEE");
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
                    return "";
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
              radius={[4, 4, 0, 0]}
              stroke="var(--color-time)"
              isAnimationActive={true} // Ensure animations are enabled
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
