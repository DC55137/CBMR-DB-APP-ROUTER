// app/components/ui/JobStagePieChart.tsx

"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import { JobStage } from "@prisma/client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type JobCounts = Partial<Record<JobStage, number>>;

interface JobStagePieChartProps {
  jobCounts: JobCounts;
}

const displayedStages: JobStage[] = [
  "lead",
  "inspect",
  "schedule",
  "followup",
  "quoted",
];

const chartConfig: Record<JobStage, { label: string; color: string }> = {
  lead: {
    label: "Lead",
    color: "hsl(var(--chart-1))",
  },
  inspect: {
    label: "Inspect",
    color: "hsl(var(--chart-2))",
  },
  schedule: {
    label: "Schedule",
    color: "hsl(var(--chart-3))",
  },
  followup: {
    label: "Follow Up",
    color: "hsl(var(--chart-4))",
  },
  missed: {
    label: "Missed",
    color: "hsl(var(--chart-5))",
  },
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-6))",
  },
  subcontractors: {
    label: "Subcontractors",
    color: "hsl(var(--chart-7))",
  },
  accepted: {
    label: "Accepted",
    color: "hsl(var(--chart-8))",
  },
  quoted: {
    label: "Quoted",
    color: "hsl(var(--chart-5))",
  },
};

export function JobStagePieChart({ jobCounts }: JobStagePieChartProps) {
  const chartData = React.useMemo(() => {
    return displayedStages.map((stage) => ({
      stage,
      count: jobCounts[stage] || 0,
      fill: chartConfig[stage].color,
      label: chartConfig[stage].label,
    }));
  }, [jobCounts]);

  const totalDisplayedJobs = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, [chartData]);

  const totalJobs = React.useMemo(() => {
    return Object.values(jobCounts).reduce(
      (acc, count) => acc + (count || 0),
      0
    );
  }, [jobCounts]);

  return (
    <Card className="flex flex-col bg-gray-800 text-white">
      <CardHeader className="items-center pb-0">
        <CardTitle>Active Job Stages</CardTitle>
        <CardDescription className="text-gray-400">
          Current Job Status Overview
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="stage"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-main-contrast text-3xl font-bold"
                        >
                          {totalDisplayedJobs.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-sm"
                        >
                          Active Jobs
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="grid grid-cols-2 gap-2">
          {chartData.map(({ stage, count, fill, label }) => (
            <div key={stage} className="flex items-center gap-1">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: fill }}
              />
              <span>
                {label}: {count}
              </span>
            </div>
          ))}
        </div>
        <div className="text-center text-muted-foreground mt-2">
          Total Jobs: {totalJobs}
        </div>
      </CardFooter>
    </Card>
  );
}
