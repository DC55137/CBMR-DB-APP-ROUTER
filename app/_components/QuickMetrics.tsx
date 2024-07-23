// components/dashboard/QuickMetrics.tsx
"use client";

import { Job, JobStage } from "@prisma/client";
import { Calendar, Users, TrendingUp, Clock } from "lucide-react";

interface QuickMetricsProps {
  jobs: Job[];
  jobCounts: Partial<Record<JobStage, number>>;
}

export default function QuickMetrics({ jobs, jobCounts }: QuickMetricsProps) {
  const getThisWeekJobsCount = () => {
    const today = new Date();
    const startOfWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - today.getDay()
    );
    const endOfWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - today.getDay() + 6
    );
    return jobs.filter(
      (job) =>
        new Date(job.date) >= startOfWeek && new Date(job.date) <= endOfWeek
    ).length;
  };

  const getMonthlyRevenue = () => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    return jobs
      .filter(
        (job) => new Date(job.date) >= startOfMonth && job.stage === "completed"
      )
      .reduce((total, job) => total + (job.quotedPrice || 0), 0)
      .toFixed(2);
  };

  const getAverageJobDuration = () => {
    const completedJobs = jobs.filter(
      (job) => job.stage === "completed" && job.startDate && job.endDate
    );
    if (completedJobs.length === 0) return "N/A";
    const totalDuration = completedJobs.reduce((total, job) => {
      const duration =
        job.endDate && job.startDate
          ? (new Date(job.endDate).getTime() -
              new Date(job.startDate).getTime()) /
            (1000 * 3600 * 24)
          : 0;
      return total + duration;
    }, 0);
    return (totalDuration / completedJobs.length).toFixed(1);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Quick Metrics</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Calendar className="mr-2 text-blue-400" />
            <p>This Week&apos;s Jobs</p>
          </div>
          <span className="font-bold">{getThisWeekJobsCount()}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Users className="mr-2 text-green-400" />
            <p>Active Leads</p>
          </div>
          <span className="font-bold">{jobCounts.lead || 0}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <TrendingUp className="mr-2 text-purple-400" />
            <p>Monthly Revenue</p>
          </div>
          <span className="font-bold">${getMonthlyRevenue()}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Clock className="mr-2 text-yellow-400" />
            <p>Avg. Job Duration</p>
          </div>
          <span className="font-bold">{getAverageJobDuration()} days</span>
        </div>
      </div>
    </div>
  );
}
