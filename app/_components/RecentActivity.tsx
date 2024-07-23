// components/dashboard/RecentActivity.tsx

import { Job } from "@prisma/client";
import Link from "next/link";
import { PATH_JOB } from "@/routes/path";
import { format } from "date-fns";

interface RecentActivityProps {
  recentJobs: Job[];
}

export default function RecentActivity({ recentJobs }: RecentActivityProps) {
  if (!recentJobs || recentJobs.length === 0) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <p>No recent jobs found.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <ul className="space-y-2">
        {recentJobs.map((job) => (
          <li key={job.id} className="flex justify-between items-center">
            <Link
              href={`${PATH_JOB.root}/${job.id}`}
              className="text-sm hover:text-blue-400"
            >
              {job.name}
            </Link>
            <div className="flex items-center">
              <span className="text-xs mr-2">
                {format(new Date(job.date), "dd/MM/yyyy")}
              </span>
              <span className="text-xs px-2 py-1 bg-blue-900 text-blue-200 rounded-full">
                {job.stage}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
