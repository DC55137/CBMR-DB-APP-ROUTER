// components/JobGeneral.tsx
"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { Job, JobStage, Prisma } from "@prisma/client";
import TextField from "./TextField";
import { updateJob } from "@/actions/updateJob";
import OriginalAdImage from "./OriginalAdImage";

interface JobGeneralProps {
  job: Job;
}

const UpdateJobSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email().nullable(),
  mobile: z.string().nullable(),
  stage: z.nativeEnum(JobStage),
  address: z.string().nullable(),
  notes: z.string().nullable(),
});

type UpdateJobFormData = z.infer<typeof UpdateJobSchema>;

export default function JobGeneral({ job }: JobGeneralProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateJobFormData>({
    resolver: zodResolver(UpdateJobSchema),
    defaultValues: {
      id: job.id,
      name: job.name,
      email: job.email,
      mobile: job.mobile,
      stage: job.stage,
      address: job.address,
      notes: job.notes,
    },
  });

  const onSubmit = async (formData: UpdateJobFormData) => {
    setLoading(true);
    toast("Updating job...");
    try {
      const updateData: Prisma.JobUpdateInput & { id: string } = {
        id: formData.id,
        name: formData.name,
        email: formData.email === null ? { set: undefined } : formData.email,
        mobile: formData.mobile === null ? { set: undefined } : formData.mobile,
        stage: formData.stage,
        address:
          formData.address === null ? { set: undefined } : formData.address,
        notes: formData.notes === null ? { set: undefined } : formData.notes,
      };

      const result = await updateJob(updateData);
      if (result.success) {
        toast.success("Job updated successfully");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to update job");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full md:w-[1000px]">
      <h1 className="my-2 mb-4 text-2xl text-white">
        Job {job.number} - {job.name}
      </h1>
      {job.date && (
        <p className="text-sm text-gray-400 mb-4">
          Created {format(new Date(job.date), "dd/MM/yyyy")}
        </p>
      )}
      <div className="mx-auto grid w-[1000px] rounded-md bg-slate-800 p-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-x-4">
            <TextField
              title="name"
              name="name"
              register={register}
              errors={errors}
            />
            <TextField
              title="mobile"
              name="mobile"
              register={register}
              errors={errors}
            />
            <TextField
              title="address"
              name="address"
              register={register}
              errors={errors}
            />
            <TextField
              title="email"
              name="email"
              register={register}
              errors={errors}
            />
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="stage"
                className="block text-sm font-medium capitalize text-slate-100"
              >
                stage
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <select
                  {...register("stage")}
                  className="block w-full rounded-md bg-slate-700 py-3 text-white hover:border hover:border-main-200 focus:border-main-200 focus:ring-main-200"
                >
                  {Object.values(JobStage).map((stage) => (
                    <option key={stage} value={stage}>
                      {stage}
                    </option>
                  ))}
                </select>
                {errors.stage && (
                  <p className="text-xs text-red-500">{errors.stage.message}</p>
                )}
              </div>
            </div>
            <div className="col-span-2">
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-slate-50"
              >
                Notes
              </label>
              <div className="mt-1">
                <textarea
                  id="notes"
                  {...register("notes")}
                  rows={6}
                  className="block w-full rounded-md border-none border-gray-300 bg-slate-700 px-4 py-3 text-white shadow-sm focus:border-main-500 focus:outline-none focus:ring-main-500"
                />
                {errors.notes && (
                  <p className="text-xs text-red-500">{errors.notes.message}</p>
                )}
              </div>
            </div>
          </div>
          <div className="my-5 ml-auto w-64">
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-main-500 px-4 py-2 text-white hover:bg-main-600 focus:outline-none focus:ring-main-500 disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Job"}
            </button>
          </div>
        </form>
      </div>

      {/* Original Ad Image component */}
      <OriginalAdImage jobId={job.id} initialImage={job.originalAdImage} />
    </div>
  );
}
