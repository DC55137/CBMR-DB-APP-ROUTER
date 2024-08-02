// app/jobs/[id]/page.tsx
"use client";

import { useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import { useJobStore } from "@/lib/zustand";
import JobGeneral from "./_components/JobGeneral";
import JobQuote from "./_components/JobQuote";
import JobImages from "./_components/JobImages";
import Tabs from "./_components/Tabs";
import JobInvoice from "./_components/JobInvoice";

export default function ViewJob() {
  const { id } = useParams();
  const { job, getJob, isLoading, error } = useJobStore();
  console.log("ViewJob", job);

  useEffect(() => {
    if (typeof id === "string") {
      if (!job || job.id !== id) {
        // Only fetch if there's no job or the job id doesn't match
        console.log("Fetching job with id:", id);
        getJob(id);
      }
    }
  }, [id, job, getJob]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!job) {
    return <div>job not found</div>;
  }

  const TABS = [
    {
      value: "general",
      label: "General",
      icon: "ic:round-account-box",
      component: <JobGeneral job={job} />,
    },
    {
      value: "quote",
      label: "Quote",
      icon: "ic:round-description",
      component: <JobQuote job={job} />,
    },
    {
      value: "images",
      label: "Images",
      icon: "ic:round-image",
      component: <JobImages job={job} />,
    },
    {
      value: "invoices",
      label: "Invoices",
      icon: "ic:round-receipt",
      component: <JobInvoice job={job} />,
    },
  ];

  return (
    <div className="bg-main-1 mt-10">
      <main className="container mx-auto pb-10">
        <Tabs tabs={TABS} />
      </main>
    </div>
  );
}
