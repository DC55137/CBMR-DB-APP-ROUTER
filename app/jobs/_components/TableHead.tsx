// app/jobs/_components/TableHead.tsx
import React from "react";
import { headLabel } from "@/data/constants";
import CustomCheckbox from "./CustomCheckbox";

interface TableHeadProps {
  rowCount?: number;
  numSelected?: number;
  onSelectAllRows: (checked: boolean) => void;
}

export function TableHead({
  rowCount = 0,
  numSelected = 0,
  onSelectAllRows,
}: TableHeadProps) {
  return (
    <thead className="border-b border-main-4 bg-main-3">
      <tr>
        <th className="w-2 px-2 sm:px-4 py-2">
          <CustomCheckbox
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={(event) => onSelectAllRows(event.target.checked)}
          />
        </th>
        <th className="px-2 sm:px-4 py-2"></th>
        {headLabel.map((headCell) => (
          <th
            className={`px-2 sm:px-4 py-2 text-slate-12 align-${
              headCell.align || "left"
            } 
              ${headCell.hideOnMobile ? "hidden sm:table-cell" : ""}`}
            style={{ minWidth: headCell.minWidth }}
            key={headCell.id}
          >
            <span className="text-xs sm:text-sm">{headCell.label}</span>
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHead;
