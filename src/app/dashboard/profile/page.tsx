"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import type { Profile } from "@/types";

export default function ProfilePage() {
  const { t } = useLanguage();
  const [profile, setProfile] = useState<Partial<Profile>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then((d) => setProfile(d.profile || {}))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        full_name: fd.get("full_name"),
        email: fd.get("email"),
        address: fd.get("address"),
        blood_group: fd.get("blood_group"),
        emergency_contact: fd.get("emergency_contact"),
        show_payment: fd.get("show_payment") === "on",
      }),
    });
    setSaving(false);
    if (res.ok) setMsg("Profile saved.");
    else setMsg("Save failed.");
  }

  if (loading) return <p className="text-gray-500">{t.common.loading}</p>;

  return (
    <div>
      <h1 className="text-xl font-bold text-primary mb-4">{t.dashboard.profile}</h1>
      <form onSubmit={handleSubmit} className="card space-y-4 max-w-lg">
        {msg && <p className="text-sm text-primary">{msg}</p>}
        <div>
          <label className="block text-sm font-medium mb-1">{t.auth.fullName}</label>
          <input name="full_name" defaultValue={profile.full_name} required className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t.book.phone}</label>
          <input value={profile.phone || ""} disabled className="input-field bg-gray-50" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t.book.email}</label>
          <input name="email" type="email" defaultValue={profile.email || ""} className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <input name="address" defaultValue={profile.address || ""} className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Blood Group</label>
          <input name="blood_group" defaultValue={profile.blood_group || ""} className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Emergency Contact</label>
          <input name="emergency_contact" defaultValue={profile.emergency_contact || ""} className="input-field" />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input name="show_payment" type="checkbox" defaultChecked={profile.show_payment !== false} />
          Show payment info in portal
        </label>
        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? t.common.loading : t.common.save}
        </button>
      </form>
    </div>
  );
}
