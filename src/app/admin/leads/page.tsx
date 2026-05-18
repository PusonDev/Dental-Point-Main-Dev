"use client";

import { useEffect, useState, useCallback } from "react";
import type { Lead, LeadStatus } from "@/types";
import { showToast } from "@/lib/toast";

const STATUS_STYLES: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  converted: "bg-green-100 text-green-700",
  lost: "bg-red-100 text-red-700",
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/leads");
      const d = await res.json();
      setLeads(d.leads || []);
    } catch {
      showToast("Failed to load leads", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function updateStatus(id: string, status: LeadStatus) {
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        showToast(`Lead marked as ${status}`);
        load();
      } else {
        showToast("Failed to update", "error");
      }
    } catch {
      showToast("Error updating lead", "error");
    }
  }

  async function archiveLead(id: string) {
    if (!confirm("Archive this lead?")) return;
    try {
      const res = await fetch("/api/admin/recovery", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table: "leads", id, action: "delete" }),
      });
      if (res.ok) {
        showToast("Lead archived");
        load();
      } else {
        showToast("Failed to archive", "error");
      }
    } catch {
      showToast("Error archiving lead", "error");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">Leads</h1>
        <span className="text-sm text-gray-500">{leads.length} total</span>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : leads.length === 0 ? (
        <div className="card text-center py-16 text-gray-500">
          <p className="text-4xl mb-3">📋</p>
          <p className="font-semibold">No leads yet</p>
          <p className="text-sm mt-1">New leads from the contact form will appear here.</p>
        </div>
      ) : (
        <div className="overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-medium">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Source</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {leads.map((l) => (
                  <tr key={l.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-gray-800">{l.full_name}</td>
                    <td className="px-4 py-3 text-gray-600">{l.phone}</td>
                    <td className="px-4 py-3 text-gray-500 capitalize">{l.source || "—"}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(l.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={l.status}
                        onChange={(e) => updateStatus(l.id, e.target.value as LeadStatus)}
                        className={`px-2 py-1 rounded-full text-xs font-bold uppercase cursor-pointer border-0 outline-none ${
                          STATUS_STYLES[l.status] || "bg-gray-100 text-gray-700"
                        }`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="converted">Converted</option>
                        <option value="lost">Lost</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => archiveLead(l.id)}
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
        </div>
      )}
    </div>
  );
}
