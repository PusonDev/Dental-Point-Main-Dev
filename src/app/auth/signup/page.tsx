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

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (!phone.trim()) {
      setError("Phone number is required");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const authEmail = phoneToEmail(phone);
    const normalized = normalizePhone(phone);

    // Sign up with email+password (phone mapped to email)
    const { data, error: signErr } = await supabase.auth.signUp({
      email: authEmail,
      password,
      options: {
        data: { full_name: fullName, phone: normalized },
      },
    });

    if (signErr) {
      setLoading(false);
      // If user already exists, try signing in and then profile create
      if (signErr.message.toLowerCase().includes("already registered")) {
        setError("Phone number already registered. Please login instead.");
      } else {
        setError(signErr.message);
      }
      return;
    }

    const userId = data.user?.id;
    if (!userId) {
      setLoading(false);
      setError("Signup failed. Please try again.");
      return;
    }

    // Create profile
    const { error: profileErr } = await supabase.from("profiles").upsert({
      id: userId,
      full_name: fullName,
      phone: normalized,
      email: email || null,
    });

    setLoading(false);

    if (profileErr) {
      setError(profileErr.message);
      return;
    }

    // Auto sign in after signup
    const { error: loginErr } = await supabase.auth.signInWithPassword({
      email: authEmail,
      password,
    });

    if (loginErr) {
      // Signup worked but auto-login failed — send to login page
      router.push("/auth/login");
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <PublicLayout minimalHeader>
      <div className="max-w-md mx-auto px-4 pt-40 pb-12">
        <h1 className="text-2xl font-bold text-primary text-center mb-2">
          {t.auth.signup}
        </h1>
        <p className="text-center text-sm text-gray-500 mb-8">
          Create your patient account to book appointments
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="card space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              {t.auth.fullName} *
            </label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="input-field"
              placeholder="Your full name"
            />
          </div>

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
              Email (Optional)
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="input-field"
              placeholder="your@email.com"
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
              minLength={6}
              className="input-field"
              placeholder="Minimum 6 characters"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Confirm Password *
            </label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              required
              minLength={6}
              className="input-field"
              placeholder="Repeat your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? t.common.loading : "Create Account"}
          </button>
        </form>

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
