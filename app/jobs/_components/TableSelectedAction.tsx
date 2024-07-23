"use client";

import React from "react";
import { Icon } from "@iconify/react";
import SendButtonPopover from "./SendButtonPopover";
import ActionButtonPopover from "./ActionButtonPopover";
import MessagesButton from "./MessagesButton";
import { useJobStore } from "@/lib/zustand";
import { toast } from "react-toastify";
import { Job, JobStage } from "@prisma/client";
import CustomCheckbox from "./CustomCheckbox";

import {
  handleCopyFolderAdd,
  handleCopyFolderPath,
  handleCopyJobNumber,
} from "@/data/iconData";
import duplicateJob from "@/actions/duplicateJob";
import deleteJobs from "@/actions/deleteJobs";

interface TableSelectedActionsProps {
  rowCount: number;
  numSelected: number;
  onSelectAllRows: (checked: boolean) => void;
  handleUpdateRow: (location: JobStage) => Promise<void>;
  selected: string[];
  dataFiltered: Job[];
  jobs: Job[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function TableSelectedActions({
  rowCount,
  numSelected,
  onSelectAllRows,
  handleUpdateRow,
  selected,
  dataFiltered,
  jobs,
  setSelected,
  setPage,
}: TableSelectedActionsProps) {
  const { updateJobs, getJobs } = useJobStore();

  const singleRow = dataFiltered.find((row) => row.id === selected[0]);

  const onDuplicateRow = async (row: Job) => {
    const numberOfDuplicates = window.prompt("Enter the number of duplicates:");
    if (numberOfDuplicates) {
      toast("Duplicating...");
      const result = await duplicateJob(
        row.id,
        parseInt(numberOfDuplicates, 10)
      );
      if (result.success) {
        toast.success(result.message);
        await getJobs(); // Fetch updated jobs from the server
      } else {
        toast.error(result.message);
      }
    }
  };

  const handleDeleteRows = async (selected: string[]) => {
    if (window.confirm("Are you sure you want to delete?")) {
      const result = await deleteJobs(selected);
      if (result.success) {
        toast.success(result.message);
        setSelected([]);
        setPage(0);
        await getJobs(); // Fetch updated jobs from the server
      } else {
        toast.error(result.message);
      }
    }
  };
  const buttons = [
    {
      Icon: "eva:copy-fill",
      className: "cursor-pointer hover:scale-105",
      onClick: (row: Job) => handleCopyJobNumber(row),
    },
    {
      Icon: "akar-icons:folder",
      className: "cursor-pointer hover:scale-105",
      onClick: (row: Job) => handleCopyFolderPath(row),
    },
    {
      Icon: "akar-icons:folder-add",
      className: "cursor-pointer hover:scale-105",
      onClick: (row: Job) => handleCopyFolderAdd(row),
    },
  ];

  return (
    <div className="absolute z-20 flex w-full items-center justify-between rounded-t-md bg-main-7 py-2 px-4 text-slate-12 shadow-md">
      <div className="flex items-center">
        <CustomCheckbox
          checked={rowCount > 0 && numSelected === rowCount}
          onChange={(event) => onSelectAllRows(event.target.checked)}
          className="mr-2"
        />
        <div className="text-slate-12 font-medium">{numSelected} selected</div>

        {selected.length === 1 && singleRow && (
          <div className="ml-8 hidden w-40 justify-between md:flex">
            {buttons.map((button, index) => (
              <button
                key={index}
                className="text-slate-12 hover:text-main-11 transition-colors duration-150"
                onClick={() => button.onClick(singleRow)}
              >
                <Icon className="h-5 w-5" icon={button.Icon} />
              </button>
            ))}
            <MessagesButton selected={singleRow} />
          </div>
        )}
      </div>
      <div className="flex items-center space-x-4">
        {selected.length === 1 && singleRow && (
          <button
            className="text-slate-12 hover:text-main-11 transition-colors duration-150"
            onClick={() => onDuplicateRow(singleRow)}
          >
            <Icon className="h-5 w-5" icon="eva:copy-fill" />
          </button>
        )}
        <SendButtonPopover handleUpdateRow={handleUpdateRow} />
        <button
          className="text-slate-12 hover:text-main-11 transition-colors duration-150"
          onClick={() => handleDeleteRows(selected)}
        >
          <Icon className="h-5 w-5" icon="eva:trash-2-outline" />
        </button>
      </div>
    </div>
  );
}
