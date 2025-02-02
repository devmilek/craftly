"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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
import { format } from "date-fns";

const chartConfig = {
  time: {
    label: "Time",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function TimeChart({
  data,
}: {
  data: {
    date: Date;
    time: number;
  }[];
}) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Time Tracking</CardTitle>
        <CardDescription>Track your time spent on tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart
            accessibilityLayer
            data={data}
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
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(_, payload) => {
                    if (payload && payload[0]) {
                      const date = new Date(payload[0].payload.date);
                      return format(date, "MMM d, yyyy");
                    }
                    return "";
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="time"
              type="natural"
              fill="var(--color-time)"
              fillOpacity={0.4}
              stroke="var(--color-time)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
