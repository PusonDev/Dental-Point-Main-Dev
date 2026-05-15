"use client";

import { useEffect, useState } from "react";
import type { Appointment, AppointmentStatus } from "@/types";

export default function ReceptionistAppointmentsPage() {
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

  return (
    <div>
      <h1 className="text-xl font-bold text-primary mb-4">Today&apos;s Appointments</h1>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <ul className="space-y-3">
          {appointments.map((a) => (
            <li key={a.id} className="card text-sm">
              <p className="font-semibold">{a.patient_name}</p>
              <p>{a.patient_phone}</p>
              <p>{a.requested_date} · {a.requested_time} · {a.reason}</p>
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
