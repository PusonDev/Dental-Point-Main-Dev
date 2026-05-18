import AdminLayoutClient from '@/components/dashboard/AdminLayoutClient';

export const metadata = {
  title: 'Admin - Dental Point',
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminLayoutClient>
      {children}
    </AdminLayoutClient>
  );
}
