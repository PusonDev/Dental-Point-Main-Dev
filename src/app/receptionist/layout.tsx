import ReceptionistLayoutClient from "@/components/dashboard/ReceptionistLayoutClient";

export default function ReceptionistLayout({ children }: { children: React.ReactNode }) {
  return <ReceptionistLayoutClient>{children}</ReceptionistLayoutClient>;
}
