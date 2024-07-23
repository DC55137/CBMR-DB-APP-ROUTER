// components/dashboard/RecentActivity.tsx
"use client";

import { Job } from "@prisma/client";

interface RecentActivityProps {
  recentJobs: Job[];
}

export default function RecentActivity({ recentJobs }: RecentActivityProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <ul className="space-y-2">
        {recentJobs.map((job) => (
          <li key={job.id} className="flex justify-between items-center">
            <span className="text-sm">{job.name}</span>
            <span className="text-xs px-2 py-1 bg-blue-900 text-blue-200 rounded-full">
              {job.stage}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
