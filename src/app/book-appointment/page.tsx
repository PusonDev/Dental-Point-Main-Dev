"use client";

import { useState } from "react";
import PublicLayout from "@/components/shared/PublicLayout";
import { useLanguage } from "@/context/LanguageContext";
import { APPOINTMENT_TIMES, APPOINTMENT_REASONS } from "@/lib/clinic-info";
import Link from "next/link";

export default function BookAppointmentPage() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const payload = {
      patient_name: String(fd.get("patient_name") || "").trim(),
      patient_phone: String(fd.get("patient_phone") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      requested_date: String(fd.get("requested_date") || ""),
      requested_time: String(fd.get("requested_time") || ""),
      reason: String(fd.get("reason") || ""),
      special_note: String(fd.get("special_note") || "").trim() || undefined,
    };

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setLoading(false);
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setError(body?.error || "Could not submit request. Please try again.");
        return;
      }
      setDone(true);
    } catch (submitError) {
      setLoading(false);
      const message = submitError instanceof Error ? submitError.message : "Network error";
      setError(`Could not submit request: ${message}`);
    }
  }

  return (
    <PublicLayout>
      <div className="max-w-lg mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-primary mb-6 text-center">{t.book.title}</h1>

        {done ? (
          <div className="card text-center text-primary font-semibold py-8">
            {t.book.success}
            <p className="mt-4 text-sm text-gray-600 font-normal">
              <Link href="/auth/signup" className="underline">Create an account</Link> to track appointments.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="card space-y-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div>
              <label className="block text-sm font-medium mb-1">{t.book.name} *</label>
              <input name="patient_name" required className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t.book.phone} *</label>
              <input name="patient_phone" type="tel" required className="input-field" placeholder="+880" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t.book.email}</label>
              <input name="email" type="email" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t.book.date} *</label>
              <input name="requested_date" type="date" required className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t.book.time} *</label>
              <select name="requested_time" required className="input-field">
                <option value="">Select time</option>
                {APPOINTMENT_TIMES.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t.book.reason} *</label>
              <select name="reason" required className="input-field">
                <option value="">Select reason</option>
                {APPOINTMENT_REASONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t.book.note}</label>
              <textarea name="special_note" rows={3} className="input-field" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? t.common.loading : t.book.submit}
            </button>
          </form>
        )}
      </div>
    </PublicLayout>
  );
}
