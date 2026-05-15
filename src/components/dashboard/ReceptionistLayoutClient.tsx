"use client";

import DashboardShell, { type NavItem } from "./DashboardShell";

const nav: NavItem[] = [
  { href: "/receptionist", label: "Overview", icon: "🏠" },
  { href: "/receptionist/entry", label: "Patient Entry", icon: "✏️" },
  { href: "/receptionist/appointments", label: "Appointments", icon: "📅" },
];

export default function ReceptionistLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell title="Reception" nav={nav} roleLabel="Receptionist">
      {children}
    </DashboardShell>
  );
}
