import React from "react";

interface TableEmptyRowsProps {
  emptyRows: number;
  height?: number;
}

export default function TableEmptyRows({
  emptyRows,
  height,
}: TableEmptyRowsProps) {
  if (!emptyRows) {
    return null;
  }
  const rows = [];
  for (let i = 0; i < emptyRows; i++) {
    rows.push(
      <tr className="h-14" key={i * 40}>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    );
  }

  return <>{rows}</>;
}
