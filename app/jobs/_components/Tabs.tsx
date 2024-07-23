import React from "react";
import clsx from "clsx";
import { Job } from "@prisma/client";

interface TabsProps {
  jobs: Job[];
  filterStage: string;
  setFilterStage: (stage: string) => void;
}

function getLengthByStatus(jobs: Job[], status: string) {
  return jobs.filter((item) => item.stage === status).length;
}

const TABS = [
  {
    value: "lead",
    label: "Lead",
    color: "bg-yellow-500",
    textColor: "text-yellow-200",
  },
  {
    value: "quoted",
    label: "Quoted",
    color: "bg-orange-500",
    textColor: "text-orange-200",
  },
  {
    value: "inspect",
    label: "Inspect",
    color: "bg-blue-500",
    textColor: "text-blue-200",
  },
  {
    value: "schedule",
    label: "Schedule",
    color: "bg-green-500",
    textColor: "text-green-200",
  },
  {
    value: "completed",
    label: "Completed",
    color: "bg-purple-500",
    textColor: "text-purple-200",
  },
  {
    value: "followup",
    label: "FollowUp",
    color: "bg-pink-500",
    textColor: "text-pink-200",
  },
  {
    value: "missed",
    label: "Missed",
    color: "bg-red-500",
    textColor: "text-red-200",
  },
  {
    value: "subcontractors",
    label: "Subby",
    color: "bg-indigo-500",
    textColor: "text-indigo-200",
  },
];

export default function Tabs({ jobs, filterStage, setFilterStage }: TabsProps) {
  return (
    <>
      <div className="px-4 sm:px-6 md:hidden lg:px-8">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          value={filterStage}
          onChange={(e) => setFilterStage(e.target.value)}
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-main-6 bg-main-3 py-2 pl-3 pr-10 text-slate-12 focus:border-main-7 focus:outline-none focus:ring-main-7 sm:text-sm"
        >
          {TABS.map((tab) => (
            <option key={tab.value} value={tab.value}>
              {tab.label}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden rounded-t-md border-b border-main-6 bg-main-2 md:block">
        <div className="mx-2">
          <nav className="flex" aria-label="Tabs">
            {TABS.map((tab) => (
              <button
                key={tab.value}
                className={clsx(
                  "group relative flex-1 overflow-hidden border-b-2 py-2 px-1 text-center text-sm font-medium transition-all duration-300 ease-in-out",
                  tab.value === filterStage
                    ? "border-main-9 text-main-11"
                    : "border-transparent text-slate-11 hover:border-main-7 hover:text-slate-12"
                )}
                onClick={() => setFilterStage(tab.value)}
              >
                <span className="relative z-10">{tab.label}</span>
                <span
                  className={clsx(
                    "absolute bottom-0 left-0 h-full w-full transform transition-transform duration-300 ease-in-out",
                    tab.value === filterStage
                      ? "translate-y-0"
                      : "translate-y-full",
                    tab.color
                  )}
                  style={{ opacity: "0.1" }}
                />
                <span className="ml-2 rounded-full bg-main-5 px-2 py-0.5 text-xs font-medium text-slate-12">
                  {getLengthByStatus(jobs, tab.value)}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
