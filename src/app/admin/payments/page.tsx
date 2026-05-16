"use client";

import { useEffect, useState } from "react";

interface PaymentRow {
  id: string;
  total_amount: number;
  paid_amount: number;
  due_amount: number;
  payment_status: string;
  profiles?: { full_name: string; phone: string };
}

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<PaymentRow[]>([]);
  const [loading, setLoading] = useState(true);

  async function archivePayment(id: string) {
    await fetch("/api/admin/recovery", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table: "payments", id, action: "delete" }),
    });
    setPayments((current) => current.filter((p) => p.id !== id));
  }

  useEffect(() => {
    fetch("/api/admin/payments")
      .then((r) => r.json())
      .then((d) => setPayments(d.payments || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold text-primary mb-4">Payments</h1>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <ul className="space-y-3">
          {payments.map((p) => (
            <li key={p.id} className="card text-sm">
              <p className="font-semibold">{p.profiles?.full_name || "Patient"}</p>
              <p className="text-gray-600">{p.profiles?.phone}</p>
              <p>
                Total ৳{p.total_amount} · Paid ৳{p.paid_amount} · Due ৳{p.due_amount}
              </p>
              <span className="text-primary capitalize text-xs">{p.payment_status}</span>
              <button
                type="button"
                onClick={() => archivePayment(p.id)}
                className="btn-secondary mt-2 py-1 px-3 text-xs"
              >
                Archive
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
