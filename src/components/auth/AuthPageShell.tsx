"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { CLINIC_INFO } from "@/lib/clinic-info";

type AuthVariant = "signin" | "signup";

type AuthPageShellProps = {
  variant: AuthVariant;
  children: React.ReactNode;
  footer: React.ReactNode;
};

export default function AuthPageShell({ variant, children, footer }: AuthPageShellProps) {
  const { t, locale } = useLanguage();
  const isBn = locale === "bn";
  const isSignIn = variant === "signin";

  const badge = isSignIn
    ? isBn
      ? "নিরাপদ পেশেন্ট পোর্টাল"
      : "Secure Patient Portal"
    : isBn
      ? "১ মিনিটে ফ্রি একাউন্ট"
      : "1-Min Free Account";

  const title = isSignIn ? t.auth.login : t.auth.signup;
  const subtitle = isSignIn
    ? isBn
      ? "আপনার পেশেন্ট পোর্টালে সাইন ইন করুন"
      : "Sign in to your patient portal"
    : isBn
      ? "১ মিনিটে আপনার ফ্রি পেশেন্ট একাউন্ট তৈরি করুন"
      : "Create your free patient account in 1 minute";

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden bg-[#0f172a]">
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-600/15 blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]"
        />
      </div>

      <div
        className={`w-full px-6 relative z-10 -mt-8 ${
          isSignIn ? "max-w-[420px]" : "max-w-[480px]"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-7"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-500 shadow-[0_0_30px_rgba(6,182,212,0.25)] mb-5 relative">
            <div className="absolute inset-0 bg-white/20 rounded-2xl border border-white/30 backdrop-blur-sm" />
            <svg className="w-8 h-8 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isSignIn ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              )}
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">{CLINIC_INFO.name}</h1>
          <p className="text-slate-400 text-sm mt-1.5 font-medium tracking-wide uppercase">{badge}</p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-slate-500 text-sm mt-3"
          >
            {subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-slate-800/60 backdrop-blur-2xl border border-slate-700/50 rounded-[2rem] shadow-2xl overflow-hidden"
        >
          <div className="px-6 py-3.5 border-b border-slate-700/50 flex items-center justify-between bg-slate-900/30">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
            <span className="flex items-center gap-1.5 text-xs text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {isBn ? "সুরক্ষিত" : "Secure"}
            </span>
          </div>

          <div className="p-6 md:p-7">{children}</div>

          <div className="px-6 md:px-7 pb-6 border-t border-slate-700/40 pt-4">{footer}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-6"
        >
          <Link
            href="/book-appointment"
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-300 transition-colors bg-slate-800/30 px-3.5 py-2 rounded-full border border-slate-700/50 backdrop-blur-sm"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {isBn ? "অ্যাপয়েন্টমেন্ট বুক করুন" : "Book Appointment"}
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-300 transition-colors bg-slate-800/30 px-3.5 py-2 rounded-full border border-slate-700/50 backdrop-blur-sm"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {isBn ? "হোমে ফিরুন" : "Back to Home"}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export function AuthErrorBanner({ message }: { message: string }) {
  if (!message) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-5 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm rounded-xl px-4 py-3 flex items-start gap-3"
    >
      <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{message}</span>
    </motion.div>
  );
}

export function AuthSubmitButton({
  loading,
  label,
  loadingLabel,
}: {
  loading: boolean;
  label: string;
  loadingLabel: string;
}) {
  return (
    <motion.button
      type="submit"
      disabled={loading}
      whileHover={{ scale: loading ? 1 : 1.02 }}
      whileTap={{ scale: loading ? 1 : 0.98 }}
      className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3.5 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.25)] disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 mt-2"
    >
      {loading ? (
        <>
          <span className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          {loadingLabel}
        </>
      ) : (
        label
      )}
    </motion.button>
  );
}
