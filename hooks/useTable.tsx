import { useState } from "react";
import { Job } from "@prisma/client";

type OrderByKey = keyof Job;

interface UseTableProps {
  defaultDense?: boolean;
  defaultOrderBy?: string;
  defaultOrder?: "asc" | "desc";
  defaultCurrentPage?: number;
  defaultRowsPerPage?: number;
  defaultSelected?: string[];
}

export default function useTable(props?: UseTableProps) {
  const [dense, setDense] = useState(props?.defaultDense ?? true);
  const [orderBy, setOrderBy] = useState<OrderByKey>(
    (props?.defaultOrderBy as OrderByKey) ?? "number"
  );
  const [order, setOrder] = useState<"asc" | "desc">(
    props?.defaultOrder ?? "asc"
  );
  const [page, setPage] = useState(props?.defaultCurrentPage ?? 0);
  const [rowsPerPage, setRowsPerPage] = useState(
    props?.defaultRowsPerPage ?? 5
  );
  const [selected, setSelected] = useState<string[]>(
    props?.defaultSelected ?? []
  );
  const [filterStage, setFilterStage] = useState("lead");
  const [filterName, setFilterName] = useState("");

  function onChangeFilterStage(stage: string) {
    setPage(0);
    setFilterStage(stage);
  }

  const handleFilterName = (filterName: string) => {
    setPage(0);
    setFilterName(filterName);
  };

  const onSelectRow = (id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const onSelectAllRows = (checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const onChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const onChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const onChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  function applySortFilter({
    jobs,
    comparator,
    filterName,
    filterStage,
  }: {
    jobs: Job[];
    comparator: (a: Job, b: Job) => number;
    filterName: string;
    filterStage: string;
  }) {
    const stabilizedThis = jobs.map(
      (el, index) => [el, index] as [Job, number]
    );

    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });

    jobs = stabilizedThis.map((el) => el[0]);

    if (filterName) {
      jobs = jobs.filter(
        (item) =>
          item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
          item.mobile
            .replace(/\s/g, "")
            .toLowerCase()
            .indexOf(filterName.replace(/\s/g, "").toLowerCase()) !== -1 ||
          item.address.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
          item.email.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
      );
    } else if (filterStage !== "all") {
      if (filterStage === "toAction") {
        jobs = jobs.filter((item) => item.toAction === true);
      } else {
        jobs = jobs.filter((item) => item.stage === filterStage);
      }
    }

    return jobs;
  }

  return {
    dense,
    order,
    page,
    setPage,
    orderBy,
    rowsPerPage,
    filterStage,
    filterName,
    onChangeFilterStage,
    selected,
    setSelected,
    onSelectRow,
    setRowsPerPage,
    onSelectAllRows,
    onChangePage,
    onChangeDense,
    onChangeRowsPerPage,
    applySortFilter,
    handleFilterName,
  };
}

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator<Key extends keyof Job>(
  order: "asc" | "desc",
  orderBy: Key
): (a: Job, b: Job) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function emptyRows(
  page: number,
  rowsPerPage: number,
  arrayLength: number
) {
  return Math.max(0, (1 + page) * rowsPerPage - arrayLength);
}
