"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import type { Profile } from "@/types";

export default function DashboardPage() {
  const { t } = useLanguage();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then((d) => setProfile(d.profile));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-2">
        {t.dashboard.welcome}{profile ? `, ${profile.full_name}` : ""}
      </h1>
      <p className="text-gray-600 mb-6 text-sm">Manage your dental records and appointments.</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          { href: "/dashboard/history", label: t.dashboard.history, icon: "📋" },
          { href: "/dashboard/reports", label: t.dashboard.reports, icon: "📄" },
          { href: "/dashboard/appointments", label: t.dashboard.appointments, icon: "📅" },
          { href: "/dashboard/payments", label: t.dashboard.payments, icon: "💰" },
          { href: "/dashboard/profile", label: t.dashboard.profile, icon: "👤" },
          { href: "/book-appointment", label: t.dashboard.bookNew, icon: "➕" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="card flex flex-col items-center justify-center py-6 hover:shadow-lg transition-shadow text-center"
          >
            <span className="text-2xl mb-2">{item.icon}</span>
            <span className="text-sm font-medium text-primary">{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="mt-6">
        <a href="/api/pdf" className="btn-primary inline-block text-sm">
          Download Visit History PDF
        </a>
      </div>
    </div>
  );
}
