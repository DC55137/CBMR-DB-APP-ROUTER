import { toast } from "react-toastify";
import { Job } from "@prisma/client";

export const handleCopyValue = (item: string) => {
  navigator.clipboard.writeText(item);
  toast(`copied!`);
};

export const handleCopyJobNumber = (job: Job) => {
  handleCopyValue(`Job Number - ${job.number} 
Name: ${job.name}
Address: ${job.address}
Email: ${job.email}
Number: ${job.mobile}`);
};

export const handleCopyFolderPath = (job: Job) => {
  let nameNoSpace = job.name.replace(/\s+/g, "");
  handleCopyValue(
    `/Users/cbroofing/Library/Mobile Documents/com~apple~CloudDocs/Documents/CBRoofing/Jobs/all/${job.number}-${nameNoSpace}`
  );
};

export const handleCopyFolderAdd = (job: Job) => {
  let nameNoSpace = job.name.replace(/\s+/g, "");
  handleCopyValue(`${job.number}-${nameNoSpace}`);
};
