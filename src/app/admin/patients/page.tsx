"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Profile } from "@/types";
import { showToast } from "@/lib/toast";

export default function AdminPatientsPage() {
  const [patients, setPatients] = useState<Profile[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  async function archivePatient(id: string) {
    if (!confirm("Are you sure you want to archive this patient?")) return;
    
    try {
      const res = await fetch("/api/admin/recovery", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table: "profiles", id, action: "delete" }),
      });
      
      if (res.ok) {
        setPatients((current) => current.filter((p) => p.id !== id));
        showToast("Patient archived");
      } else {
        showToast("Failed to archive patient", "error");
      }
    } catch (err) {
      showToast("Error archiving patient", "error");
    }
  }

  async function load(search = q) {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/patients?q=${encodeURIComponent(search)}`);
      const d = await res.json();
      setPatients(d.patients || d.data || []);
    } catch (err) {
      console.error("Failed to load patients:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-primary">Patient Management</h1>
        <Link href="/admin/patients/new" className="btn-primary py-2 px-4 text-sm">
          + Add New Patient
        </Link>
      </div>

      <div className="flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && load()}
          placeholder="Search name or phone number..."
          className="input-field flex-1"
        />
        <button type="button" onClick={() => load()} className="btn-primary py-2 px-6 text-sm">
          Search
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="overflow-hidden card p-0 border border-gray-100 shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="p-4">Patient Name</th>
                <th className="p-4">Phone Number</th>
                <th className="p-4">Joined Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {patients.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-10 text-center text-gray-500">
                    No patients found. Try a different search.
                  </td>
                </tr>
              ) : (
                patients.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <Link href={`/admin/patients/${p.id}`} className="font-bold text-primary hover:underline">
                        {p.full_name}
                      </Link>
                    </td>
                    <td className="p-4">{p.phone}</td>
                    <td className="p-4 text-gray-500">
                      {new Date(p.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <Link
                        href={`/admin/patients/${p.id}`}
                        className="text-primary font-semibold hover:underline"
                      >
                        Details
                      </Link>
                      <span className="text-gray-300">|</span>
                      <button
                        type="button"
                        onClick={() => archivePatient(p.id)}
                        className="text-red-500 font-semibold hover:underline"
                      >
                        Archive
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

