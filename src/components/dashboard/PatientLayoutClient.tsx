"use client";

import DashboardShell, { type NavItem } from "./DashboardShell";
import { useLanguage } from "@/context/LanguageContext";

export default function PatientLayoutClient({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage();
  const nav: NavItem[] = [
    { href: "/dashboard", label: t.dashboard.home, icon: "🏠" },
    { href: "/dashboard/history", label: t.dashboard.history, icon: "📋" },
    { href: "/dashboard/reports", label: t.dashboard.reports, icon: "📄" },
    { href: "/dashboard/appointments", label: t.dashboard.appointments, icon: "📅" },
    { href: "/dashboard/payments", label: t.dashboard.payments, icon: "💰" },
    { href: "/dashboard/profile", label: t.dashboard.profile, icon: "👤" },
  ];

  return (
    <DashboardShell title={t.dashboard.patientPortal} nav={nav}>
      {children}
    </DashboardShell>
  );
}
