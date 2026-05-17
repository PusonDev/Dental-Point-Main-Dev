"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import DataTable from "@/components/dashboard/DataTable";
import useAppointmentsRealtime from "@/hooks/useAppointmentsRealtime";
import { showToast } from "@/lib/toast";

interface Stats {
  patients: number;
  newLeads: number;
  pendingAppointments: number;
  totalDue: number;
  pendingWhatsApp: number;
  appointments_today?: number;
  revenue?: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [latest, setLatest] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [apptRes, statsRes] = await Promise.all([
        fetch('/api/admin/appointments'),
        fetch('/api/admin/stats')
      ]);

      const apptJson = await apptRes.json();
      if (apptJson.data) setLatest(apptJson.data.slice(0, 8));

      const statsJson = await statsRes.json();
      setStats(statsJson || null);
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // handle new appointment from realtime
  useAppointmentsRealtime((newAppointment) => {
    setLatest((prev) => [newAppointment, ...prev].slice(0, 8));
    showToast(`New booking: ${newAppointment.patient_name}`);
    // Refresh stats when new appointment arrives
    fetch('/api/admin/stats')
      .then(r => r.json())
      .then(setStats)
      .catch(() => {});
  });

  const cards = [
    { label: "Patients", value: stats?.patients ?? "—", href: "/admin/patients", color: "text-blue-600" },
    { label: "New Leads", value: stats?.newLeads ?? "—", href: "/admin/leads", color: "text-orange-600" },
    { label: "Pending Appts", value: stats?.pendingAppointments ?? "—", href: "/admin/appointments", color: "text-red-600" },
    { label: "Total Due (৳)", value: stats?.totalDue ?? "—", href: "/admin/payments", color: "text-purple-600" },
    { label: "Today's Appts", value: stats?.appointments_today ?? "—", href: "/admin/appointments", color: "text-green-600" },
    { label: "WhatsApp Queue", value: stats?.pendingWhatsApp ?? "—", href: "/admin/whatsapp", color: "text-teal-600" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-primary mb-6">Admin Overview</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {cards.map((c) => (
            <Link key={c.href} href={c.href} className="card hover:shadow-lg transition-all hover:-translate-y-1">
              <p className={`text-2xl font-bold ${c.color}`}>{c.value}</p>
              <p className="text-xs text-gray-500 mt-1 font-medium uppercase tracking-wider">{c.label}</p>
            </Link>
          ))}
        </div>
      </div>

      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800">Latest Appointments</h2>
          <Link href="/admin/appointments" className="text-primary text-sm font-semibold hover:underline">
            View All
          </Link>
        </div>
        <div className="p-0">
          <DataTable
            columns={[
              { key: 'patient_name', title: 'Patient Name' },
              { key: 'patient_phone', title: 'Phone' },
              { key: 'requested_date', title: 'Date' },
              { key: 'requested_time', title: 'Time' },
              { 
                key: 'status', 
                title: 'Status',
                render: (val: string) => (
                  <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${
                    val === 'confirmed' ? 'bg-green-100 text-green-700' :
                    val === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    val === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {val}
                  </span>
                )
              },
            ]}
            rows={latest}
          />
          {!loading && latest.length === 0 && (
            <div className="p-10 text-center text-gray-500">
              No recent appointments found.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
