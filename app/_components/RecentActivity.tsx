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
      <div className="bg-gray-800 p-6 rounded-lg shadow h-full">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <p>No recent activity found.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow h-full">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <ul className="space-y-2">
        {recentJobs.map((job) => (
          <li key={job.id} className="flex flex-col space-y-1 mb-4">
            <Link
              href={`${PATH_JOB.root}/${job.id}`}
              className="text-sm font-medium hover:text-blue-400"
            >
              {job.name}
            </Link>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>
                {format(
                  new Date(job.updatedAt || job.date),
                  "dd/MM/yyyy HH:mm"
                )}
              </span>
              <span className="px-2 py-1 bg-blue-900 text-blue-200 rounded-full">
                {job.stage}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
