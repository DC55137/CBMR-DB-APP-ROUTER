import React from "react";

import { Job } from "@prisma/client";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  jobs: Job[];
  rowsPerPage: number;
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const MAX_PAGE_LINKS = 7;

export default function Pagination({
  page,
  setPage,
  jobs,
  rowsPerPage,
  onChangeRowsPerPage,
}: PaginationProps) {
  const numPages = Math.ceil(jobs.length / rowsPerPage) - 1;

  const pageLinks = [];
  for (let i = 0; i <= numPages; i++) {
    pageLinks.push(
      <button
        key={i}
        onClick={() => {
          setPage(i);
        }}
        className={`inline-flex cursor-pointer items-center border-b-4 ${
          i === page
            ? "border-main-100 text-main-11"
            : "border-transparent text-gray-100 hover:border-gray-700 hover:text-gray-700"
        } px-4 pt-4 text-sm font-medium`}
        aria-current={i === page ? "page" : undefined}
      >
        {i}
      </button>
    );
  }

  let startIndex = 1;
  let endIndex = MAX_PAGE_LINKS;
  if (numPages > MAX_PAGE_LINKS) {
    if (page > 3) {
      startIndex = page - 3;
      endIndex = page + 3;
    }
    if (startIndex < 1) {
      endIndex -= startIndex - 1;
      startIndex = 1;
    }
    if (endIndex > numPages) {
      startIndex -= endIndex - numPages;
      endIndex = numPages + 1;
    }
  }

  return (
    <nav
      className="flex items-center justify-between border border-main-4 bg-main-2 px-4 pb-4"
      aria-label="Pagination"
    >
      <div className="flex w-0 flex-1">
        <button
          className="inline-flex cursor-pointer items-center border-b-4 border-transparent pt-4 pr-1 text-sm font-medium text-slate-11 hover:border-main-7 hover:text-main-11"
          onClick={() => {
            if (page > 0) {
              setPage(page - 1);
            }
          }}
        >
          <ArrowLeft className="mr-3 h-5 w-5" aria-hidden="true" />
          Previous
        </button>
      </div>
      <div className="hidden md:flex">
        {page > 4 && numPages > MAX_PAGE_LINKS && (
          <button
            onClick={() => {
              setPage(0);
            }}
            className="inline-flex cursor-pointer items-center border-b-4 border-transparent px-4 pt-4 text-sm font-medium text-slate-100 hover:border-slate-200 hover:text-slate-700"
          >
            0
          </button>
        )}
        {page > 4 && numPages > MAX_PAGE_LINKS && (
          <span className="inline-flex cursor-pointer items-center px-4 pt-4 text-sm font-medium text-slate-100">
            ...
          </span>
        )}
        {pageLinks.slice(startIndex - 1, endIndex + 1).map((link) => link)}
        {page < numPages - 3 && numPages > MAX_PAGE_LINKS && (
          <span className="inline-flex cursor-pointer items-center px-4 pt-4 text-sm font-medium text-slate-100">
            ...
          </span>
        )}
        {page < numPages - 2 && numPages > MAX_PAGE_LINKS && (
          <button
            onClick={() => {
              setPage(numPages);
            }}
            className="inline-flex cursor-pointer items-center border-b-4 border-transparent px-4 pt-4 text-sm font-medium text-slate-100 hover:border-slate-200 hover:text-slate-700"
          >
            {numPages}
          </button>
        )}
      </div>

      <div className="flex w-0 flex-1 justify-end">
        <div className="mt-2 mr-5 items-center">
          <select
            className="focus:shadow-outline-blue appearance-none rounded-md border p-1 border-main-100 bg-gray-800 leading-4 text-gray-300 focus:border-main-100 focus:outline-none"
            value={rowsPerPage}
            onChange={onChangeRowsPerPage}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
        <button
          className="inline-flex cursor-pointer items-center border-b-4 border-transparent pt-4 pr-1 text-sm font-medium text-slate-11 hover:border-main-7 hover:text-main-11"
          onClick={() => {
            if (page < numPages) {
              setPage(page + 1);
            }
          }}
        >
          Next
          <ArrowRight
            className="ml-3 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </button>
      </div>
    </nav>
  );
}
