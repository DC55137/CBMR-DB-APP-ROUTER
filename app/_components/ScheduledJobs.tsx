// components/dashboard/ScheduledJobs.tsx
import { Job } from "@prisma/client";
import Link from "next/link";
import { PATH_JOB } from "@/routes/path";
import { format } from "date-fns";
import { Calendar, Clock, MapPin, Phone } from "lucide-react";

interface ScheduledJobsProps {
  jobs: Job[];
}

export default function ScheduledJobs({ jobs }: ScheduledJobsProps) {
  if (!jobs || jobs.length === 0) {
    return (
      <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Scheduled Jobs</h2>
        <p>No scheduled jobs found.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Scheduled Jobs</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm font-medium text-gray-400">
              <th className="pb-2">Name</th>
              <th className="pb-2">Received</th>
              <th className="pb-2">Time</th>
              <th className="pb-2">Address</th>
              <th className="pb-2">Contact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {jobs.map((job) => (
              <tr key={job.id} className="hover:bg-gray-700">
                <td className="py-3">
                  <Link
                    href={`${PATH_JOB.root}/${job.id}`}
                    className="text-sm font-medium hover:text-blue-400"
                  >
                    {job.name}
                  </Link>
                </td>
                <td className="py-3">
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 text-yellow-400" size={16} />
                    {format(new Date(job.date), "dd/MM/yyyy")}
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex items-center text-sm">
                    <Clock className="mr-2 text-blue-400" size={16} />
                    {job.startDate
                      ? format(new Date(job.startDate), "HH:mm")
                      : "N/A"}
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex items-center text-sm">
                    <MapPin className="mr-2 text-green-400" size={16} />
                    {job.address}
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex items-center text-sm">
                    <Phone className="mr-2 text-purple-400" size={16} />
                    {job.mobile}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
