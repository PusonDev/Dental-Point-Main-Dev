"use client";

import { usePathname } from "next/navigation";
import DashboardShell, { type NavItem } from "./DashboardShell";

const adminNav: NavItem[] = [
  { href: "/admin", label: "Overview", icon: "📊" },
  { href: "/admin/patients", label: "Patients", icon: "👥" },
  { href: "/admin/leads", label: "Leads", icon: "📋" },
  { href: "/admin/appointments", label: "Appointments", icon: "📅" },
  { href: "/admin/payments", label: "Payments", icon: "💰" },
  { href: "/admin/whatsapp", label: "WhatsApp", icon: "💬" },
  { href: "/admin/settings", label: "Settings", icon: "⚙️" },
];

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <DashboardShell title="Admin Panel" nav={adminNav} roleLabel="Administrator">
      {children}
    </DashboardShell>
  );
}
