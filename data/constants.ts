// app/src/components/data/constants.js
import { PATH_JOB, PATH_PAGE } from "@/routes/path";

const navigation = [
  { name: "Dashboard", href: `${PATH_PAGE.root}`, current: true },
  { name: "Jobs", href: `${PATH_JOB.root}`, current: false },
  { name: "Bills", href: `${PATH_PAGE.bills}`, current: false },
];

const headLabel = [
  { id: "number", label: "Client", align: "left", minWidth: 150 },
  { id: "address", label: "Address", align: "left", minWidth: 350 },
  { id: "Mobile", label: "Mobile", align: "left", minwidth: 100 },
  { id: "email", label: "Email", align: "right", minwidth: 150 },
];

export { navigation, headLabel };
