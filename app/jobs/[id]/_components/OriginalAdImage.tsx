// components/OriginalAdImage.tsx
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { toast } from "react-toastify";
import { updateJob } from "@/actions/updateJob";

interface OriginalAdImageProps {
  jobId: string;
  initialImage: string | null;
}

export default function OriginalAdImage({
  jobId,
  initialImage,
}: OriginalAdImageProps) {
  const [originalAdImage, setOriginalAdImage] = useState<string | null>(
    initialImage
  );

  const handleUploadSuccess = async (result: any) => {
    const imageUrl = result.info.secure_url;
    setOriginalAdImage(imageUrl);

    try {
      const result = await updateJob({
        id: jobId,
        originalAdImage: imageUrl, // Change this line
      });
      if (result.success) {
        toast.success("Original ad image uploaded successfully");
      } else {
        toast.error("Failed to update job with new image");
      }
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error("An error occurred while updating the job");
    }
  };

  const handleDeleteImage = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete the original ad image?"
    );
    if (confirmDelete) {
      try {
        const result = await updateJob({
          id: jobId,
          originalAdImage: null, // Change this line
        });
        if (result.success) {
          setOriginalAdImage(null);
          toast.success("Original ad image deleted successfully");
        } else {
          toast.error("Failed to delete original ad image");
        }
      } catch (error) {
        console.error("Error deleting original ad image:", error);
        toast.error("An error occurred while deleting the image");
      }
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl text-white mb-2">Original Ad/Email Image</h2>
      {originalAdImage ? (
        <div className="relative h-[640px] w-[520px] mb-4">
          <Image
            src={originalAdImage}
            alt="Original Ad Image"
            layout="fill"
            objectFit="contain"
          />
          <button
            onClick={handleDeleteImage}
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
          >
            Delete
          </button>
        </div>
      ) : (
        <CldUploadWidget
          uploadPreset="original_ad_images"
          onSuccess={handleUploadSuccess}
        >
          {({ open }) => (
            <button
              onClick={() => open()}
              className="w-[520px] h-[640px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors duration-300"
            >
              <span>Click or drag to upload original ad/email image</span>
            </button>
          )}
        </CldUploadWidget>
      )}
    </div>
  );
}
