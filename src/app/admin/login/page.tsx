"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import BuiltBy from "@/components/layout/BuiltBy";
import { CLINIC_INFO } from "@/lib/clinic-info";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/admin/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (err) {
      if (err.message.toLowerCase().includes("invalid")) {
        setError("Invalid email or password. Please try again.");
      } else {
        setError(err.message);
      }
      return;
    }

    router.push(redirect);
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-light-bg flex flex-col">
      <header className="bg-primary py-6 px-4 text-center text-white">
        <h1 className="font-bold text-lg">{CLINIC_INFO.name}</h1>
        <p className="text-sm text-white/80 mt-1">Staff Portal</p>
      </header>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="card space-y-4">
            <div className="text-center mb-2">
              <span className="text-4xl">🔐</span>
              <h2 className="text-xl font-bold text-primary mt-2">Admin Login</h2>
              <p className="text-sm text-gray-500 mt-1">
                Sign in with your staff credentials
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field"
                placeholder="admin@dentalpoint.com"
                autoComplete="email"
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
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <p className="text-xs text-center text-gray-500">
              Patient account?{" "}
              <a href="/auth/login" className="text-primary underline">
                Login here
              </a>
            </p>
          </form>
        </div>
      </div>

      <BuiltBy />
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
