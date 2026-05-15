"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Stats {
  patients: number;
  newLeads: number;
  pendingAppointments: number;
  totalDue: number;
  pendingWhatsApp: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats);
  }, []);

  const cards = [
    { label: "Patients", value: stats?.patients ?? "—", href: "/admin/patients" },
    { label: "New Leads", value: stats?.newLeads ?? "—", href: "/admin/leads" },
    { label: "Pending Appointments", value: stats?.pendingAppointments ?? "—", href: "/admin/appointments" },
    { label: "Total Due (৳)", value: stats?.totalDue ?? "—", href: "/admin/payments" },
    { label: "WhatsApp Queue", value: stats?.pendingWhatsApp ?? "—", href: "/admin/whatsapp" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">Admin Overview</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="card hover:shadow-lg transition-shadow">
            <p className="text-2xl font-bold text-primary">{c.value}</p>
            <p className="text-sm text-gray-600 mt-1">{c.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
