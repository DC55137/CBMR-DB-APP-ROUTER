// components/JobImages.tsx
"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { toast } from "react-toastify";
import { updateJob } from "@/actions/updateJob";
import { Job } from "@prisma/client";

interface JobImagesProps {
  job: Job;
}

export default function JobImages({ job }: JobImagesProps) {
  const [images, setImages] = useState({
    image1: job.image1 || null,
    image2: job.image2 || null,
    image3: job.image3 || null,
    image4: job.image4 || null,
  });

  const handleUploadSuccess = async (
    result: any,
    imageKey: keyof typeof images
  ) => {
    const imageUrl = result.info.secure_url;
    setImages((prev) => ({ ...prev, [imageKey]: imageUrl }));

    try {
      const updatedJob = await updateJob({
        id: job.id,
        [imageKey]: imageUrl,
      });
      if (updatedJob.success) {
        toast.success(`${imageKey} uploaded successfully`);
      } else {
        toast.error(`Failed to update job with new ${imageKey}`);
      }
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error("An error occurred while updating the job");
    }
  };

  const handleDeleteImage = async (imageKey: keyof typeof images) => {
    try {
      const updatedJob = await updateJob({
        id: job.id,
        [imageKey]: null,
      });
      if (updatedJob.success) {
        setImages((prev) => ({ ...prev, [imageKey]: null }));
        toast.success(`${imageKey} deleted successfully`);
      } else {
        toast.error(`Failed to delete ${imageKey}`);
      }
    } catch (error) {
      console.error("Error deleting job image:", error);
      toast.error("An error occurred while deleting the job image");
    }
  };

  return (
    <div className="mx-auto w-full md:w-[1000px]">
      <h2 className="my-2 mb-4 text-2xl text-white">Job Images</h2>
      <div className="mx-auto grid grid-cols-2 gap-4 rounded-md bg-slate-800 p-10">
        {(["image1", "image2", "image3", "image4"] as const).map((imageKey) => (
          <div key={imageKey} className="relative h-[300px] w-full">
            {images[imageKey] ? (
              <>
                <Image
                  src={images[imageKey]!}
                  alt={`Job ${imageKey}`}
                  layout="fill"
                  objectFit="cover"
                />
                <button
                  onClick={() => handleDeleteImage(imageKey)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
                >
                  Delete
                </button>
              </>
            ) : (
              <CldUploadWidget
                uploadPreset="job_images"
                onSuccess={(result) => handleUploadSuccess(result, imageKey)}
              >
                {({ open }) => (
                  <button
                    onClick={() => open()}
                    className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors duration-300"
                  >
                    <span>Upload {imageKey}</span>
                  </button>
                )}
              </CldUploadWidget>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
