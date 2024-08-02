import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export const metadata = {
  title: "Jobs ",
  description: "Manage your jobs efficiently",
};

const Layout = ({ children }: LayoutProps) => {
  return <main>{children}</main>;
};

export default Layout;
