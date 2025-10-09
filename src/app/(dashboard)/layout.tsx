import { DashboardLayout } from "./_components/dashboard-layout";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <DashboardLayout>
      <h1>Topbar</h1>
      <h1>Sidebar</h1>
      {children}
    </DashboardLayout>
  );
};

export default Layout;
