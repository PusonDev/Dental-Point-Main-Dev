"use client";

import { useEffect, useState } from "react";
import type { Appointment, Lead, Payment, Profile } from "@/types";

interface RecoveryPayload {
  profiles: Profile[];
  leads: Lead[];
  appointments: Appointment[];
  payments: Payment[];
}

export default function AdminRecoveryPage() {
  const [recovery, setRecovery] = useState<RecoveryPayload>({ profiles: [], leads: [], appointments: [], payments: [] });
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/recovery");
    const data = await res.json();
    setRecovery({
      profiles: data.profiles || [],
      leads: data.leads || [],
      appointments: data.appointments || [],
      payments: data.payments || [],
    });
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleRestore(table: "profiles" | "leads" | "appointments" | "payments", id: string) {
    setActionLoading(id);
    await fetch("/api/admin/recovery", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table, id, action: "restore" }),
    });
    setActionLoading(null);
    load();
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-primary mb-4">Recovery / Trash</h1>
      <p className="text-sm text-gray-600 mb-6">Archived records are stored here for safe restore. Nothing is permanently deleted unless you remove it from the database manually.</p>
      {loading ? (
        <p className="text-gray-500">Loading archived items...</p>
      ) : (
        <div className="space-y-6">
          {Object.entries(recovery).map(([section, items]) => (
            <section key={section} className="card p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-primary capitalize">{section}</h2>
                <span className="text-xs text-gray-500">{(items as any[]).length} archived</span>
              </div>
              {(items as any[]).length === 0 ? (
                <p className="text-gray-500 text-sm">No archived {section}.</p>
              ) : (
                <ul className="space-y-3">
                  {(items as any[]).map((item) => (
                    <li key={item.id} className="border border-gray-200 rounded-lg p-3 flex flex-col gap-2">
                      <div className="flex flex-wrap gap-3 items-center justify-between">
                        <div className="space-y-1 text-sm">
                          {section === "profiles" && <p className="font-medium">{item.full_name} · {item.phone}</p>}
                          {section === "leads" && <p className="font-medium">{item.full_name} · {item.phone}</p>}
                          {section === "appointments" && <p className="font-medium">{item.patient_name} · {item.patient_phone}</p>}
                          {section === "payments" && <p className="font-medium">Payment ID {item.id}</p>}
                          <p className="text-xs text-gray-500">Archived: {new Date(item.deleted_at || item.created_at).toLocaleString()}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRestore(section as any, item.id)}
                          disabled={actionLoading === item.id}
                          className="btn-primary py-1 px-3 text-xs"
                        >
                          {actionLoading === item.id ? "Restoring..." : "Restore"}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
