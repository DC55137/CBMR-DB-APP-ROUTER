"use client";
import { useRouter } from "next/navigation";
import { useJobStore } from "@/lib/zustand";
import { fDateTimeSuffix } from "@/utils/formatTime";
import { handleCopyValue } from "@/data/iconData";
import { Icon } from "@iconify/react";
import { Job } from "@prisma/client";
import CustomCheckbox from "./CustomCheckbox";
import { PATH_JOB } from "@/routes/path";

interface TableRowProps {
  row: Job;
  selected: boolean;
  onSelectRow: () => void;
  showColumn: boolean;
}

export default function TableRow({
  row,
  selected,
  onSelectRow,
  showColumn,
}: TableRowProps) {
  const { name, address, mobile, email, notes, number, stage, date, id } = row;

  const { setSelectedJob, startLoading } = useJobStore();
  const router = useRouter();

  function handleJobLink(row: Job) {
    startLoading();
    setSelectedJob(row);
    router.push(`${PATH_JOB.root}/${id}`);
  }

  function truncateName(name: string) {
    return name.length > 15 ? name.substring(0, 20) + "..." : name;
  }

  function truncateNotes(notes: string) {
    return notes.length > 50 ? notes.substring(0, 70) + "..." : notes;
  }

  function jobFolder({ number, name }: { number: number; name: string }) {
    name = name.replace(/\s/g, "");
    return `${number}-${name}`;
  }

  function jobFolderLocation({
    number,
    name,
  }: {
    number: number;
    name: string;
  }) {
    name = name.replace(/\s/g, "");
    return `/Users/cbroofing/Library/Mobile Documents/com~apple~CloudDocs/Documents/CBRoofing/Jobs/all/${number}-${name}`;
  }

  const jobFolderName = jobFolder(row);
  const jobFolderLocationString = jobFolderLocation(row);

  return (
    <tr
      className={`${
        selected ? "bg-main-3" : "bg-main-2"
      } h-2.5 text-ellipsis text-base text-slate-11 hover:bg-main-4 transition-colors duration-150`}
    >
      <td className="px-4 py-2">
        <CustomCheckbox checked={selected} onChange={onSelectRow} />
      </td>
      <td className="eading-5 cursor-pointer">
        <Icon
          className="inline h-6 w-6"
          icon={"akar-icons:folder"}
          onClick={() => handleCopyValue(jobFolderLocationString)}
        />
      </td>

      <td className="px-2 py-2 leading-5 ">
        <button
          onClick={() => handleJobLink(row)}
          className="underline hover:text-slate-400"
        >
          {number}-{stage}
        </button>
        <br />
        <p className="cursor-pointer" onClick={() => handleCopyValue(name)}>
          {truncateName(name)}
        </p>
      </td>
      <td
        onClick={() => handleCopyValue(address)}
        className="cursor-pointer px-2 py-2 leading-5"
      >
        <p>{address ? address : "no address"}</p>
        <p className="text-xs">notes: {truncateNotes(notes)}</p>
      </td>
      <td
        onClick={() => handleCopyValue(mobile)}
        className="cursor-pointer px-2 py-2 leading-5"
      >
        {mobile ? mobile : "no No."}
      </td>
      <td
        className="cursor-pointer px-2 py-2 leading-5"
        onClick={() => handleCopyValue(email)}
      >
        {email ? email : "no Email"} <br />
        Received - {fDateTimeSuffix(date)}
      </td>
    </tr>
  );
}
