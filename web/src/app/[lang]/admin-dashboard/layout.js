import AdminDashboardLayout from "@/layout_admin_dashboard/AdminDashboardLayout";

export const metadata = {
  title: "Admin Dashboard",
  description: "BookQubit Admin Dashboard",
};

export default function Layout({ children }) {
  return <AdminDashboardLayout>{children}</AdminDashboardLayout>;
}