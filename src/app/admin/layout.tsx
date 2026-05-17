import AdminLayout from '@/components/dashboard/AdminLayout';

export const metadata = {
  title: 'Admin - Dental Point',
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}
