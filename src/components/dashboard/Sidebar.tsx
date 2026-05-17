"use client";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen border-r p-4 bg-white">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Dental Admin</h2>
      </div>

      <nav className="space-y-3 text-sm">
        <Link className="block hover:text-blue-600" href="/admin/dashboard">🏠 Dashboard</Link>
        <Link className="block hover:text-blue-600" href="/admin/appointments">📅 Appointments</Link>
        <Link className="block hover:text-blue-600" href="/admin/patients">👤 Patients</Link>
        <Link className="block hover:text-blue-600" href="/admin/visits">🩺 Visits</Link>
        <Link className="block hover:text-blue-600" href="/admin/payments">💰 Payments</Link>
        <Link className="block hover:text-blue-600" href="/admin/leads">📈 Leads</Link>
        <Link className="block hover:text-blue-600" href="/admin/whatsapp-queue">💬 WhatsApp</Link>
        <Link className="block hover:text-blue-600" href="/admin/settings">⚙️ Settings</Link>
      </nav>
    </aside>
  );
}
