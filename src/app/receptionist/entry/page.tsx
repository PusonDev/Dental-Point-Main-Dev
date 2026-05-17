"use client";

import { useState, useEffect } from "react";
import { APPOINTMENT_REASONS } from "@/lib/clinic-info";
import type { Profile } from "@/types";
import { showToast } from "@/lib/toast";

export default function ReceptionistEntryPage() {
  const [patients, setPatients] = useState<Profile[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [search, setSearch] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadPatients(q = "") {
    try {
      const res = await fetch(`/api/admin/patients?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setPatients(data.patients || []);
    } catch (err) {
      console.error("Failed to load patients");
    }
  }

  useEffect(() => {
    loadPatients();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedPatientId) {
      showToast("Please select a patient", "error");
      return;
    }

    setLoading(true);
    setMsg("");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/admin/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patient_id: selectedPatientId,
          visit_date: fd.get("visit_date"),
          chief_complaint: fd.get("chief_complaint"),
          treatment_done: fd.get("treatment_done"),
          doctor_notes: fd.get("doctor_notes"),
        }),
      });

      if (res.ok) {
        showToast("Visit recorded successfully");
        setMsg("Visit recorded.");
        (e.target as HTMLFormElement).reset();
        setSelectedPatientId("");
        setSearch("");
      } else {
        showToast("Failed to record visit", "error");
        setMsg("Failed to save.");
      }
    } catch (err) {
      showToast("Network error", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-primary">Record Patient Visit</h1>
      
      <form onSubmit={handleSubmit} className="card space-y-6 max-w-2xl">
        {msg && (
          <div className={`p-3 rounded-lg text-sm ${msg.includes("recorded") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
            {msg}
          </div>
        )}

        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-700">Select Patient *</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                loadPatients(e.target.value);
              }}
              className="input-field mb-2"
            />
            <div className="max-h-40 overflow-y-auto border rounded-lg divide-y bg-white">
              {patients.length === 0 ? (
                <div className="p-3 text-xs text-gray-400">No patients found.</div>
              ) : (
                patients.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setSelectedPatientId(p.id);
                      setSearch(`${p.full_name} (${p.phone})`);
                    }}
                    className={`w-full text-left p-3 text-sm transition-colors ${
                      selectedPatientId === p.id ? "bg-primary/10 border-l-4 border-primary" : "hover:bg-gray-50"
                    }`}
                  >
                    <p className="font-bold">{p.full_name}</p>
                    <p className="text-xs text-gray-500">{p.phone}</p>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Visit Date *</label>
            <input name="visit_date" type="date" defaultValue={new Date().toISOString().split('T')[0]} required className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Chief Complaint</label>
            <input name="chief_complaint" className="input-field" list="reasons" placeholder="Select or type..." />
            <datalist id="reasons">
              {APPOINTMENT_REASONS.map((r) => (
                <option key={r} value={r} />
              ))}
            </datalist>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Treatment Done</label>
            <textarea name="treatment_done" rows={2} className="input-field" placeholder="Describe the treatment..." />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Doctor Notes</label>
            <textarea name="doctor_notes" rows={2} className="input-field" placeholder="Internal notes for next time..." />
          </div>
        </div>

        <button type="submit" disabled={loading || !selectedPatientId} className="btn-primary w-full py-4 text-lg">
          {loading ? "Saving Visit..." : "Complete & Save Visit"}
        </button>
      </form>
    </div>
  );
}

