// app/components/NewJobForm.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "@/components/TextField";
import TextFieldEmail from "@/components/TextFieldEmail";
import SelectField from "@/components/SelectField";
import { addJob } from "@/actions/addJob";

const JobSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().optional(),
  mobile: z.string().optional(),
  address: z.string().optional(),
  notes: z.string().optional(),
  stage: z.enum([
    "lead",
    "inspect",
    "schedule",
    "missed",
    "completed",
    "subcontractors",
    "followup",
    "accepted",
    "website",
  ]),
});

type JobFormData = z.infer<typeof JobSchema>;

const stageOptions = [
  { value: "lead", label: "Lead" },
  { value: "inspect", label: "Inspect" },
  { value: "schedule", label: "Schedule" },
  { value: "missed", label: "Missed" },
  { value: "completed", label: "Completed" },
  { value: "subcontractors", label: "Subcontractors" },
  { value: "followup", label: "Follow Up" },
  { value: "accepted", label: "Accepted" },
  { value: "website", label: "Website" },
];

export default function NewJobForm() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean | undefined>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobFormData>({
    resolver: zodResolver(JobSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      stage: "lead",
      address: "",
      notes: "",
    },
  });

  const onSubmit = async (data: JobFormData) => {
    setLoading(true);
    toast("Sending...");

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));

    const result = await addJob(formData);

    if ("error" in result) {
      toast.error("Failed to create job");
      console.error(result.error);
    } else {
      toast.success(
        `Job created successfully with number ${result.job.number}`
      );
      router.push("/jobs");
    }

    setLoading(false);
  };

  return (
    <div className="mx-auto rounded-lg bg-main-2 shadow-lg md:w-[1000px]">
      <div className="mt-12 p-10">
        <h2 className="text-2xl font-bold text-slate-12 mb-6">
          Create New Job
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
        >
          <TextField
            name="name"
            title="name"
            register={register}
            errors={errors}
            autoComplete="name"
            placeholder="Name"
          />
          <TextField
            name="email"
            title="email"
            register={register}
            errors={errors}
            autoComplete="email"
            placeholder="Email"
          />
          <TextField
            name="mobile"
            title="mobile"
            register={register}
            errors={errors}
            autoComplete="tel"
            placeholder="Mobile"
          />
          <TextField
            name="address"
            title="address"
            register={register}
            errors={errors}
            autoComplete="street-address"
            placeholder="Address"
          />
          <SelectField
            name="stage"
            title="Stage"
            register={register}
            errors={errors}
            options={stageOptions}
          />
          <div className="sm:col-span-2">
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-slate-11"
            >
              Message
            </label>
            <div className="mt-1">
              <textarea
                id="notes"
                {...register("notes")}
                rows={4}
                className="block w-full rounded-md border-none bg-main-3 px-4 py-3 text-slate-12 shadow-sm focus:border-main-7 focus:ring-main-7 placeholder-slate-8"
                placeholder="Additional notes..."
              />
              {errors.notes && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.notes.message}
                </p>
              )}
            </div>
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-main-9 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-main-10 focus:outline-none focus:ring-2 focus:ring-main-11 focus:ring-offset-2 disabled:opacity-50 transition duration-150 ease-in-out"
            >
              {loading ? "Loading..." : "Create Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
