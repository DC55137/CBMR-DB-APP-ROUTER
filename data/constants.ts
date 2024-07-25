// app/src/components/data/constants.js
import { PATH_JOB, PATH_PAGE } from "@/routes/path";

const navigation = [
  { name: "Jobs", href: `${PATH_JOB.root}`, current: false },
  { name: "Bills", href: `${PATH_PAGE.bills}`, current: false },
  { name: "Calendar", href: `${PATH_PAGE.calendar}`, current: false },
  { name: "Todo", href: `${PATH_PAGE.todo}`, current: false },
  { name: "Rates", href: `${PATH_PAGE.rates}`, current: false },
];

const headLabel = [
  {
    id: "number",
    label: "Client",
    align: "left",
    minWidth: 100,
    hideOnMobile: false,
  },
  {
    id: "address",
    label: "Address",
    align: "left",
    minWidth: 200,
    hideOnMobile: true,
  },
  {
    id: "Mobile",
    label: "Mobile",
    align: "left",
    minWidth: 80,
    hideOnMobile: true,
  },
  {
    id: "email",
    label: "Email",
    align: "right",
    minWidth: 120,
    hideOnMobile: true,
  },
];

export { navigation, headLabel };
