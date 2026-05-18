"use client";

import { useEffect, useState, useCallback } from "react";
import type { Appointment, AppointmentStatus } from "@/types";
import { showToast } from "@/lib/toast";

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  completed: "bg-blue-100 text-blue-700",
};

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/appointments");
      const d = await res.json();
      // API returns { appointments: [...] }
      setAppointments(d.appointments || d.data || []);
    } catch (err) {
      console.error("Failed to load appointments:", err);
      showToast("Failed to load appointments", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function updateStatus(id: string, status: AppointmentStatus) {
    try {
      const res = await fetch("/api/admin/appointments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        showToast(`Status updated to ${status}`);
        load();
      } else {
        showToast("Failed to update status", "error");
      }
    } catch {
      showToast("Error updating status", "error");
    }
  }

  async function archiveAppointment(id: string) {
    if (!confirm("Archive this appointment?")) return;
    try {
      const res = await fetch("/api/admin/recovery", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table: "appointments", id, action: "delete" }),
      });
      if (res.ok) {
        showToast("Appointment archived");
        load();
      } else {
        showToast("Failed to archive", "error");
      }
    } catch {
      showToast("Error archiving", "error");
    }
  }

  const filtered =
    filter === "all"
      ? appointments
      : appointments.filter((a) => a.status === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap gap-3 justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">Appointments</h1>
        <div className="flex gap-2 flex-wrap">
          {["all", "pending", "confirmed", "completed", "cancelled"].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilter(s)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
                filter === s
                  ? "bg-primary text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-primary hover:text-primary"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="card text-center py-16 text-gray-500">
          <p className="text-4xl mb-3">📅</p>
          <p className="font-semibold">No appointments found</p>
          <p className="text-sm mt-1">
            {filter !== "all" ? `No "${filter}" appointments yet.` : "No appointments yet."}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-medium">
                <tr>
                  <th className="px-4 py-3">Patient</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Date & Time</th>
                  <th className="px-4 py-3">Reason</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((a) => (
                  <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-gray-800">
                      {a.patient_name}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{a.patient_phone}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {a.requested_date}
                      {a.requested_time && (
                        <span className="text-gray-400"> · {a.requested_time}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600 max-w-[160px] truncate">
                      {a.reason || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={a.status}
                        onChange={(e) =>
                          updateStatus(a.id, e.target.value as AppointmentStatus)
                        }
                        className={`px-2 py-1 rounded-full text-xs font-bold uppercase cursor-pointer border-0 outline-none ${
                          STATUS_STYLES[a.status] || "bg-gray-100 text-gray-700"
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => archiveAppointment(a.id)}
                        className="text-red-500 hover:text-red-700 text-xs font-semibold hover:underline"
                      >
                        Archive
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-400 text-right">
            Showing {filtered.length} of {appointments.length} appointments
          </div>
        </div>
      )}
    </div>
  );
}
