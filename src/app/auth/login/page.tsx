"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import PublicLayout from "@/components/shared/PublicLayout";
import { useLanguage } from "@/context/LanguageContext";
import { createClient } from "@/lib/supabase/client";
import { phoneToEmail } from "@/lib/phone";

function LoginForm() {
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const email = phoneToEmail(phone);

    const { error: err } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (err) {
      if (
        err.message.toLowerCase().includes("invalid") ||
        err.message.toLowerCase().includes("credentials")
      ) {
        setError("Invalid phone number or password. Please try again.");
      } else {
        setError(err.message);
      }
      return;
    }

    router.push(redirect);
    router.refresh();
  }

  return (
    <PublicLayout minimalHeader>
      <div className="max-w-md mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-primary text-center mb-2">
          {t.auth.login}
        </h1>
        <p className="text-center text-sm text-gray-500 mb-8">
          Sign in to your patient account
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="card space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              {t.auth.phone} *
            </label>
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
            <label className="block text-sm font-medium mb-1">
              {t.auth.password} *
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              className="input-field"
              placeholder="Your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? t.common.loading : t.auth.login}
          </button>
        </form>

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
