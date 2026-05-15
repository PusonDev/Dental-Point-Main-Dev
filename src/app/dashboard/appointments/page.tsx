"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import type { Appointment } from "@/types";

export default function PatientAppointmentsPage() {
  const { t } = useLanguage();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/appointments")
      .then((r) => r.json())
      .then((d) => setAppointments(d.appointments || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-primary">{t.dashboard.appointments}</h1>
        <Link href="/book-appointment" className="btn-primary text-sm py-2 px-4">
          {t.dashboard.bookNew}
        </Link>
      </div>
      {loading ? (
        <p className="text-gray-500">{t.common.loading}</p>
      ) : appointments.length === 0 ? (
        <p className="text-gray-500 text-sm">No appointments yet.</p>
      ) : (
        <ul className="space-y-3">
          {appointments.map((a) => (
            <li key={a.id} className="card text-sm">
              <div className="flex justify-between">
                <span className="font-semibold">{a.requested_date}</span>
                <span className="capitalize text-primary">{a.status}</span>
              </div>
              <p>{a.requested_time} · {a.reason}</p>
              {a.notes && <p className="text-gray-500 text-xs mt-1">{a.notes}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
