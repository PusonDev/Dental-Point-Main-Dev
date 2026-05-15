"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import BuiltBy from "@/components/layout/BuiltBy";
import { CLINIC_INFO } from "@/lib/clinic-info";
import { Suspense } from "react";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (err) {
      setError(err.message);
      return;
    }
    router.push(redirect);
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-light-bg flex flex-col">
      <header className="bg-primary py-6 px-4 text-center text-white">
        <h1 className="font-bold text-lg">{CLINIC_INFO.name}</h1>
        <p className="text-sm text-white/80 mt-1">Staff Login</p>
      </header>
      <div className="flex-1 flex items-center justify-center p-4">
        <form onSubmit={handleSubmit} className="card w-full max-w-md space-y-4">
          <h2 className="text-xl font-bold text-primary text-center">Admin / Reception</h2>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div>
            <label className="block text-sm font-medium mb-1">Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password *</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Signing in..." : "Sign In"}
          </button>
          <p className="text-xs text-center text-gray-500">
            Patient login is at{" "}
            <a href="/auth/login" className="text-primary underline">
              /auth/login
            </a>
          </p>
        </form>
      </div>
      <BuiltBy />
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AdminLoginForm />
    </Suspense>
  );
}
