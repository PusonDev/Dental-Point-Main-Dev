"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PublicLayout from "@/components/shared/PublicLayout";
import { useLanguage } from "@/context/LanguageContext";
import { createClient } from "@/lib/supabase/client";
import { normalizePhone, phoneToEmail } from "@/lib/phone";

export default function SignupPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function sendOtp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithOtp({ phone: normalizePhone(phone) });
    setLoading(false);
    if (err) {
      setError(err.message);
      return;
    }
    setStep(2);
  }

  async function verifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error: err } = await supabase.auth.verifyOtp({
      phone: normalizePhone(phone),
      token: otp,
      type: "sms",
    });
    setLoading(false);
    if (err) {
      setError(err.message);
      return;
    }
    setStep(3);
  }

  async function completeProfile(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const normalized = normalizePhone(phone);
    const authEmail = phoneToEmail(phone);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      const { error: signErr } = await supabase.auth.signUp({
        email: authEmail,
        password,
        phone: normalized,
        options: { data: { full_name: fullName } },
      });
      if (signErr) {
        setLoading(false);
        setError(signErr.message);
        return;
      }
    } else if (password) {
      await supabase.auth.updateUser({ password });
    }

    const { data: { user: finalUser } } = await supabase.auth.getUser();
    if (!finalUser) {
      setLoading(false);
      setError("Account creation failed. Try logging in.");
      return;
    }

    const { error: profileErr } = await supabase.from("profiles").upsert({
      id: finalUser.id,
      full_name: fullName,
      phone: normalized,
      email: email || null,
    });

    setLoading(false);
    if (profileErr) {
      setError(profileErr.message);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <PublicLayout minimalHeader>
      <div className="max-w-md mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-primary text-center mb-2">{t.auth.signup}</h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          {t.auth.step} {step} / 3
        </p>

        <div className="flex gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded ${s <= step ? "bg-primary" : "bg-gray-200"}`}
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        {step === 1 && (
          <form onSubmit={sendOtp} className="card space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">{t.auth.phone} *</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                required
                className="input-field"
                placeholder="01XXXXXXXXX"
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? t.common.loading : t.auth.sendOtp}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={verifyOtp} className="card space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">OTP Code *</label>
              <input value={otp} onChange={(e) => setOtp(e.target.value)} required className="input-field" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? t.common.loading : t.auth.verify}
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={completeProfile} className="card space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">{t.auth.fullName} *</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t.auth.password} *</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                minLength={6}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t.book.email}</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="input-field"
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? t.common.loading : t.common.submit}
            </button>
          </form>
        )}

        <p className="text-center text-sm mt-6 text-gray-600">
          Already registered?{" "}
          <Link href="/auth/login" className="text-primary font-semibold">
            {t.auth.login}
          </Link>
        </p>
      </div>
    </PublicLayout>
  );
}

