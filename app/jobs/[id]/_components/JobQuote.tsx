// components/JobQuote.tsx
"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { toast } from "react-toastify";
import { updateJob } from "@/actions/updateJob";
import { Job } from "@prisma/client";

interface JobQuoteProps {
  job: Job;
}

export default function JobQuote({ job }: JobQuoteProps) {
  const [quoteImage, setQuoteImage] = useState(job.quoteImage || "");

  const handleUploadSuccess = async (result: any) => {
    const imageUrl = result.info.secure_url;
    setQuoteImage(imageUrl);

    try {
      const updatedJob = await updateJob({ id: job.id, quoteImage: imageUrl });
      if (updatedJob.success) {
        toast.success("Quote image uploaded successfully");
      } else {
        toast.error("Failed to update job with new quote image");
      }
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error("An error occurred while updating the job");
    }
  };

  const handleDeleteImage = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete the quote image?"
    );
    if (confirmDelete) {
      try {
        const updatedJob = await updateJob({ id: job.id, quoteImage: null });
        if (updatedJob.success) {
          setQuoteImage("");
          toast.success("Quote image deleted successfully");
        } else {
          toast.error("Failed to delete quote image");
        }
      } catch (error) {
        console.error("Error deleting job quote image:", error);
        toast.error("An error occurred while deleting the quote image");
      }
    }
  };

  return (
    <div className="mx-auto w-full md:w-[1000px] ">
      <h2 className="my-2 mb-4 text-2xl text-white">Quote</h2>
      <div className="mx-auto rounded-md bg-slate-800 p-10">
        {quoteImage ? (
          <div className="relative h-[800px] w-full">
            <Image
              src={quoteImage}
              alt="Job Quote"
              layout="fill"
              objectFit="contain"
            />
            <button
              onClick={handleDeleteImage}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete Image
            </button>
          </div>
        ) : (
          <CldUploadWidget
            uploadPreset="job_quotes"
            onSuccess={handleUploadSuccess}
          >
            {({ open }) => (
              <button
                onClick={() => open()}
                className="w-full h-[600px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors duration-300"
              >
                <span>Click or drag to upload quote image</span>
              </button>
            )}
          </CldUploadWidget>
        )}
      </div>
    </div>
  );
}
