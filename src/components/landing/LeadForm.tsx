"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function LeadForm() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        full_name: fd.get("full_name"),
        phone: fd.get("phone"),
        email: fd.get("email") || undefined,
      }),
    });
    setLoading(false);
    if (!res.ok) {
      setError("Something went wrong. Please try again.");
      return;
    }
    setDone(true);
    (e.target as HTMLFormElement).reset();
  }

  if (done) {
    return (
      <div className="card max-w-md mx-auto text-center text-primary font-semibold py-8">
        {t.landing.thanks}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card max-w-md mx-auto space-y-4">
      <h3 className="text-xl font-bold text-primary text-center">{t.landing.formTitle}</h3>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div>
        <label className="block text-sm font-medium mb-1">{t.book.name} *</label>
        <input name="full_name" required className="input-field" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">{t.book.phone} *</label>
        <input name="phone" type="tel" required className="input-field" placeholder="+880" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">{t.book.email}</label>
        <input name="email" type="email" className="input-field" />
      </div>
      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? t.common.loading : `${t.landing.submit} →`}
      </button>
      <p className="text-center text-xs text-gray-500">✓ 100% Free ✓ No Spam</p>
    </form>
  );
}
