import PatientLayoutClient from "@/components/dashboard/PatientLayoutClient";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <PatientLayoutClient>{children}</PatientLayoutClient>;
}
