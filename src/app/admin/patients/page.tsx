"use client";

import { useEffect, useState } from "react";
import type { Profile } from "@/types";

export default function AdminPatientsPage() {
  const [patients, setPatients] = useState<Profile[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  async function archivePatient(id: string) {
    await fetch("/api/admin/recovery", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table: "profiles", id, action: "delete" }),
    });
    setPatients((current) => current.filter((p) => p.id !== id));
  }

  function load(search = q) {
    setLoading(true);
    fetch(`/api/admin/patients?q=${encodeURIComponent(search)}`)
      .then((r) => r.json())
      .then((d) => setPatients(d.patients || []))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold text-primary mb-4">Patients</h1>
      <div className="flex gap-2 mb-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name or phone"
          className="input-field flex-1"
        />
        <button type="button" onClick={() => load()} className="btn-primary py-2 px-4 text-sm">
          Search
        </button>
      </div>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm card">
            <thead>
              <tr className="border-b text-left">
                <th className="p-2">Name</th>
                <th className="p-2">Phone</th>
                <th className="p-2">Joined</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.id} className="border-b border-gray-100">
                  <td className="p-2 font-medium">{p.full_name}</td>
                  <td className="p-2">{p.phone}</td>
                  <td className="p-2 text-gray-500">{new Date(p.created_at).toLocaleDateString()}</td>
                  <td className="p-2">
                    <button
                      type="button"
                      onClick={() => archivePatient(p.id)}
                      className="btn-secondary text-xs py-1 px-2"
                    >
                      Archive
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
