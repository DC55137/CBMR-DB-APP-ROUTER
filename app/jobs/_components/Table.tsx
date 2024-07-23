"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useJobStore } from "@/lib/zustand";
import useTable, { getComparator, emptyRows } from "@/hooks/useTable";
import TableHead from "./TableHead";
import TableRow from "./TableRow";
import TableSelectedActions from "./TableSelectedAction";
import Search from "./Search";
import Pagination from "./Pagination";
import Tabs from "./Tabs";
import TableEmptyRows from "./TableEmptyRows";
import { Job, JobStage } from "@prisma/client";
import updateJobs from "@/actions/updateJobs";

interface TableProps {
  initialJobs: Job[];
  showExtra: boolean;
}

export default function Table({ initialJobs, showExtra }: TableProps) {
  const [showColumn, setShowColumn] = useState(true);
  const { jobs, setJobs, updateJobRows } = useJobStore();

  // Set initial jobs in Zustand store
  useEffect(() => {
    setJobs(initialJobs);
  }, [initialJobs, setJobs]);

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    filterName,
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    onChangePage,
    onChangeRowsPerPage,
    filterStage,
    onChangeFilterStage,
    handleFilterName,
    applySortFilter,
  } = useTable({ defaultOrderBy: "number" });

  const dataFiltered = applySortFilter({
    jobs,
    comparator: getComparator(order, orderBy),
    filterName,
    filterStage,
  });

  const handleUpdateRow = async (location: JobStage) => {
    if (window.confirm(`Are you sure you want to move to ${location}?`)) {
      const sendRows = jobs.filter((row) => selected.includes(row.id));
      setSelected([]);
      if (page * rowsPerPage >= dataFiltered.length) {
        setPage(0);
      }
      sendRows.forEach((row) => {
        updateJobRows({ id: row.id, stage: location });
      });
      try {
        const data = await updateJobs({ jobs: sendRows, stage: location });

        if (data.success) {
          toast(data.message);
        } else {
          toast.error(data.message);
          console.error(data.message);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto rounded-t-lg border-2 border-b-0 border-main-3 md:overflow-visible ">
          {!filterName && (
            <Tabs
              jobs={jobs}
              filterStage={filterStage}
              setFilterStage={onChangeFilterStage}
            />
          )}
          <Search
            filterName={filterName}
            onFilterName={handleFilterName}
            setSelected={setSelected}
          />
          <div className="relative block min-w-full align-middle ">
            {selected.length > 0 && (
              <TableSelectedActions
                dataFiltered={dataFiltered}
                selected={selected}
                setSelected={setSelected}
                setPage={setPage}
                numSelected={selected.length}
                rowCount={dataFiltered.length}
                handleUpdateRow={handleUpdateRow}
                jobs={jobs}
                onSelectAllRows={(checked: boolean) =>
                  onSelectAllRows(
                    checked,
                    dataFiltered.map((row) => row.id)
                  )
                }
              />
            )}
            <table className="relative min-w-full ">
              <TableHead
                rowCount={dataFiltered.length}
                numSelected={selected.length}
                onSelectAllRows={(checked: boolean) =>
                  onSelectAllRows(
                    checked,
                    dataFiltered.map((row) => row.id)
                  )
                }
              />
              <tbody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      key={row.id}
                      row={row}
                      selected={selected.includes(row.id)}
                      onSelectRow={() => onSelectRow(row.id)}
                      showColumn={showColumn}
                    />
                  ))}
                <TableEmptyRows
                  emptyRows={emptyRows(page, rowsPerPage, dataFiltered.length)}
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination
        setPage={setPage}
        page={page}
        jobs={dataFiltered}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </>
  );
}
