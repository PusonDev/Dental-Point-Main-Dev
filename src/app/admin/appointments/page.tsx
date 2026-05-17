"use client";
import React, { useEffect, useState } from "react";
import DataTable from "@/components/dashboard/DataTable";

export default function AdminAppointmentsPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/appointments');
      const j = await res.json();
      setRows(j.data || []);
    } catch (e) {
      console.error(e);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Appointments</h1>
        <div>
          <button onClick={load} className="px-3 py-2 bg-blue-600 text-white rounded">Refresh</button>
        </div>
      </div>

      {loading ? <div>Loading...</div> : (
        <DataTable
          columns={[
            { key: 'id', title: 'ID' },
            { key: 'patient_name', title: 'Name' },
            { key: 'patient_phone', title: 'Phone' },
            { key: 'requested_date', title: 'Date' },
            { key: 'requested_time', title: 'Time' },
            { key: 'status', title: 'Status' },
          ]}
          rows={rows}
        />
      )}
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import type { Appointment, AppointmentStatus } from "@/types";

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  function load() {
    fetch("/api/admin/appointments")
      .then((r) => r.json())
      .then((d) => setAppointments(d.appointments || []))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  async function updateStatus(id: string, status: AppointmentStatus) {
    await fetch("/api/admin/appointments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    load();
  }

  async function archiveAppointment(id: string) {
    await fetch("/api/admin/recovery", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table: "appointments", id, action: "delete" }),
    });
    load();
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-primary mb-4">Appointments</h1>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <ul className="space-y-3">
          {appointments.map((a) => (
            <li key={a.id} className="card text-sm">
              <p className="font-semibold">{a.patient_name} · {a.patient_phone}</p>
              <p>{a.requested_date} {a.requested_time} — {a.reason}</p>
              {a.special_note && <p className="text-gray-500 text-xs">{a.special_note}</p>}
              <select
                value={a.status}
                onChange={(e) => updateStatus(a.id, e.target.value as AppointmentStatus)}
                className="input-field mt-2 text-xs py-1"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
              <button
                type="button"
                onClick={() => archiveAppointment(a.id)}
                className="btn-secondary mt-2 py-1 px-3 text-xs"
              >
                Archive
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
