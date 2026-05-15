"use client";

import { useState } from "react";
import { APPOINTMENT_REASONS } from "@/lib/clinic-info";

export default function ReceptionistEntryPage() {
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/patients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        patient_id: fd.get("patient_id"),
        visit_date: fd.get("visit_date"),
        chief_complaint: fd.get("chief_complaint"),
        treatment_done: fd.get("treatment_done"),
        doctor_notes: fd.get("doctor_notes"),
      }),
    });
    setLoading(false);
    setMsg(res.ok ? "Visit recorded." : "Failed — ensure patient UUID is valid.");
    if (res.ok) (e.target as HTMLFormElement).reset();
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-primary mb-4">Record Visit</h1>
      <form onSubmit={handleSubmit} className="card space-y-4 max-w-lg">
        {msg && <p className="text-sm text-primary">{msg}</p>}
        <div>
          <label className="block text-sm font-medium mb-1">Patient ID (UUID) *</label>
          <input name="patient_id" required className="input-field font-mono text-xs" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Visit Date *</label>
          <input name="visit_date" type="date" required className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Chief Complaint</label>
          <input name="chief_complaint" className="input-field" list="reasons" />
          <datalist id="reasons">
            {APPOINTMENT_REASONS.map((r) => (
              <option key={r} value={r} />
            ))}
          </datalist>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Treatment Done</label>
          <textarea name="treatment_done" rows={2} className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Doctor Notes</label>
          <textarea name="doctor_notes" rows={2} className="input-field" />
        </div>
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "Saving..." : "Save Visit"}
        </button>
      </form>
    </div>
  );
}
