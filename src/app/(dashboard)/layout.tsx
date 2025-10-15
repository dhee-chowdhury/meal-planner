import { DashboardLayout } from "./_components/dashboard-layout";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default Layout;
