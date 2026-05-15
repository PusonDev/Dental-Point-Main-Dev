"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import PublicLayout from "@/components/shared/PublicLayout";
import { useLanguage } from "@/context/LanguageContext";
import { createClient } from "@/lib/supabase/client";
import { normalizePhone, phoneToEmail } from "@/lib/phone";

type Tab = "password" | "otp";

function LoginForm() {
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const [tab, setTab] = useState<Tab>("password");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loginPassword(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const email = phoneToEmail(phone);
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (err) {
      setError(err.message);
      return;
    }
    router.push(redirect);
    router.refresh();
  }

  async function sendOtp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithOtp({
      phone: normalizePhone(phone),
    });
    setLoading(false);
    if (err) {
      setError(err.message);
      return;
    }
    setOtpSent(true);
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
    router.push(redirect);
    router.refresh();
  }

  return (
    <PublicLayout minimalHeader>
      <div className="max-w-md mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-primary text-center mb-6">{t.auth.login}</h1>

        <div className="flex rounded-lg overflow-hidden border border-primary/30 mb-6">
          <button
            type="button"
            onClick={() => setTab("password")}
            className={`flex-1 py-2 text-sm font-medium ${tab === "password" ? "bg-primary text-white" : "bg-white text-primary"}`}
          >
            {t.auth.password}
          </button>
          <button
            type="button"
            onClick={() => setTab("otp")}
            className={`flex-1 py-2 text-sm font-medium ${tab === "otp" ? "bg-primary text-white" : "bg-white text-primary"}`}
          >
            {t.auth.otp}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        {tab === "password" ? (
          <form onSubmit={loginPassword} className="card space-y-4">
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
            <div>
              <label className="block text-sm font-medium mb-1">{t.auth.password} *</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                className="input-field"
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? t.common.loading : t.auth.login}
            </button>
          </form>
        ) : !otpSent ? (
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
        ) : (
          <form onSubmit={verifyOtp} className="card space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">OTP Code *</label>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="input-field"
                placeholder="6-digit code"
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? t.common.loading : t.auth.verify}
            </button>
          </form>
        )}

        <p className="text-center text-sm mt-6 text-gray-600">
          New patient?{" "}
          <Link href="/auth/signup" className="text-primary font-semibold">
            {t.auth.signup}
          </Link>
        </p>
      </div>
    </PublicLayout>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
