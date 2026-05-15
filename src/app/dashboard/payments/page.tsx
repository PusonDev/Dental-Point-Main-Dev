"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import type { Payment } from "@/types";

export default function PaymentsPage() {
  const { t } = useLanguage();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [hidden, setHidden] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/payments")
      .then((r) => r.json())
      .then((d) => {
        setPayments(d.payments || []);
        setHidden(!!d.hidden);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold text-primary mb-4">{t.dashboard.payments}</h1>
      {loading ? (
        <p className="text-gray-500">{t.common.loading}</p>
      ) : hidden ? (
        <p className="text-gray-500 text-sm">Payment details are hidden on your profile.</p>
      ) : payments.length === 0 ? (
        <p className="text-gray-500 text-sm">No payment records.</p>
      ) : (
        <ul className="space-y-3">
          {payments.map((p) => (
            <li key={p.id} className="card text-sm">
              <div className="flex justify-between font-semibold">
                <span>৳{p.total_amount}</span>
                <span className="capitalize text-primary">{p.payment_status}</span>
              </div>
              <p className="text-gray-600">Paid: ৳{p.paid_amount} · Due: ৳{p.due_amount}</p>
              {p.payment_date && <p className="text-xs text-gray-400">{p.payment_date}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
