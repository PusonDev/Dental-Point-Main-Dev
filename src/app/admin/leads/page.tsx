"use client";

import { useEffect, useState } from "react";
import type { Lead, LeadStatus } from "@/types";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  function load() {
    fetch("/api/admin/leads")
      .then((r) => r.json())
      .then((d) => setLeads(d.leads || []))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  async function updateStatus(id: string, status: LeadStatus) {
    await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    load();
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-primary mb-4">Leads</h1>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <ul className="space-y-3">
          {leads.map((l) => (
            <li key={l.id} className="card text-sm">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <p className="font-semibold">{l.full_name}</p>
                  <p>{l.phone}</p>
                  <p className="text-xs text-gray-500">{l.source} · {new Date(l.created_at).toLocaleString()}</p>
                </div>
                <select
                  value={l.status}
                  onChange={(e) => updateStatus(l.id, e.target.value as LeadStatus)}
                  className="input-field w-auto text-xs py-1"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="converted">Converted</option>
                  <option value="lost">Lost</option>
                </select>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
