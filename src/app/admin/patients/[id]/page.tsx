"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import type { Profile, Visit, Report, Payment, Appointment } from "@/types";
import { showToast } from "@/lib/toast";

type Tab = "overview" | "visits" | "reports" | "payments" | "appointments";

export default function PatientDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState<{
    profile: Profile;
    visits: Visit[];
    reports: Report[];
    payments: Payment[];
    appointments: Appointment[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/patients/${id}`);
      if (!res.ok) throw new Error("Failed to load patient");
      const json = await res.json();
      setData(json);
    } catch (err) {
      showToast("Error loading patient details", "error");
      router.push("/admin/patients");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center py-20">
      <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!data) return <div className="p-10 text-center">Patient not found</div>;

  const { profile, visits, reports, payments, appointments } = data;

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/admin/patients" className="text-gray-400 hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold text-primary">{profile.full_name}</h1>
        </div>
        <div className="flex gap-2">
           <button className="btn-secondary px-4 py-2 text-sm">Edit Profile</button>
           <button className="btn-primary px-4 py-2 text-sm">+ Add Visit</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <div className="card space-y-4">
            <h2 className="font-bold border-b pb-2">Contact Information</h2>
            <div className="text-sm space-y-2">
              <p className="flex justify-between"><span className="text-gray-500">Phone:</span> <span>{profile.phone}</span></p>
              <p className="flex justify-between"><span className="text-gray-500">Email:</span> <span>{profile.email || "N/A"}</span></p>
              <p className="flex justify-between"><span className="text-gray-500">Gender:</span> <span>{profile.gender || "N/A"}</span></p>
              <p className="flex justify-between"><span className="text-gray-500">Blood Group:</span> <span>{profile.blood_group || "N/A"}</span></p>
            </div>
          </div>
          
          <div className="card space-y-4">
            <h2 className="font-bold border-b pb-2">Medical Overview</h2>
            <div className="text-sm space-y-2">
              <p className="flex justify-between"><span className="text-gray-500">Total Visits:</span> <span>{visits.length}</span></p>
              <p className="flex justify-between"><span className="text-gray-500">Last Visit:</span> <span>{visits[0]?.visit_date || "Never"}</span></p>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="flex border-b mb-6 overflow-x-auto">
            {(["overview", "visits", "reports", "payments", "appointments"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-6 py-3 text-sm font-bold capitalize whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === t ? "border-primary text-primary" : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="card">
                  <h3 className="font-bold mb-4">Latest Visit</h3>
                  {visits[0] ? (
                    <div className="space-y-2 text-sm">
                      <p className="font-bold text-primary">{visits[0].visit_date}</p>
                      <p><span className="font-medium">Complaint:</span> {visits[0].chief_complaint}</p>
                      <p><span className="font-medium">Treatment:</span> {visits[0].treatment_done}</p>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm italic">No visits recorded yet.</p>
                  )}
                </div>
                <div className="card">
                  <h3 className="font-bold mb-4">Address</h3>
                  <p className="text-sm text-gray-600">{profile.address || "No address provided."}</p>
                </div>
              </div>
            )}

            {activeTab === "visits" && (
              <div className="space-y-4">
                {visits.length === 0 ? (
                  <p className="text-center py-10 text-gray-500">No visits recorded.</p>
                ) : (
                  visits.map((v) => (
                    <div key={v.id} className="card hover:shadow-md transition-shadow">
                      <div className="flex justify-between mb-2">
                        <p className="font-bold text-primary">{v.visit_date}</p>
                      </div>
                      <div className="text-sm space-y-1">
                        <p><span className="font-semibold">Chief Complaint:</span> {v.chief_complaint}</p>
                        <p><span className="font-semibold">Treatment:</span> {v.treatment_done}</p>
                        {v.doctor_notes && <p className="text-gray-500 mt-2 italic">&ldquo;{v.doctor_notes}&rdquo;</p>}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === "reports" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {reports.length === 0 ? (
                  <p className="col-span-2 text-center py-10 text-gray-500">No reports uploaded.</p>
                ) : (
                  reports.map((r) => (
                    <div key={r.id} className="card flex flex-col justify-between">
                      <div>
                        <p className="font-bold text-sm truncate">{r.file_name}</p>
                        <p className="text-xs text-gray-500">{new Date(r.uploaded_at).toLocaleDateString()}</p>
                      </div>
                      <a 
                        href={r.file_url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="mt-4 text-center btn-secondary py-1 text-xs"
                      >
                        View Report
                      </a>
                    </div>
                  ))
                )}
              </div>
            )}
            
            {activeTab === "payments" && (
              <div className="space-y-3">
                {payments.length === 0 ? (
                  <p className="text-center py-10 text-gray-500">No payment history.</p>
                ) : (
                  payments.map((p) => (
                    <div key={p.id} className="card flex justify-between items-center">
                      <div>
                        <p className="text-xs text-gray-500">{new Date(p.created_at).toLocaleDateString()}</p>
                        <p className="font-bold">৳{p.paid_amount} Paid</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-[10px] uppercase px-2 py-0.5 rounded-full font-bold ${
                          p.payment_status === "paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {p.payment_status}
                        </span>
                        <p className="text-xs text-gray-400 mt-1">Due: ৳{p.due_amount}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === "appointments" && (
              <div className="space-y-4">
                {appointments.length === 0 ? (
                  <p className="text-center py-10 text-gray-500">No appointment history.</p>
                ) : (
                  appointments.map((a) => (
                    <div key={a.id} className="card flex justify-between items-center">
                      <div>
                        <p className="font-bold">{a.confirmed_date || a.requested_date}</p>
                        <p className="text-xs text-gray-500">{a.confirmed_time || a.requested_time} · {a.reason}</p>
                      </div>
                      <span className={`text-xs capitalize font-bold ${
                        a.status === "confirmed" ? "text-green-600" : a.status === "cancelled" ? "text-red-500" : "text-primary"
                      }`}>
                        {a.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
