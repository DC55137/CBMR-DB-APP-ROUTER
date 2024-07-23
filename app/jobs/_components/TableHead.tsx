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
        <th className="w-2 px-4 py-2">
          <CustomCheckbox
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={(event) => onSelectAllRows(event.target.checked)}
          />
        </th>

        <th></th>

        {headLabel.map((headCell) => (
          <th
            className={`px-4 py-2 text-slate-12 align-${
              headCell.align || "left"
            }`}
            style={{ minWidth: headCell.minWidth }}
            key={headCell.id}
          >
            {headCell.label}
          </th>
        ))}
        <th></th>
      </tr>
    </thead>
  );
}

export default TableHead;
