import AdminLayout from '@/components/dashboard/AdminLayout';

export const metadata = {
  title: 'Admin - Dental',
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}
import AdminLayoutClient from "@/components/dashboard/AdminLayoutClient";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
