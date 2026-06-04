"use client";

import { useEffect } from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import { showToast } from "@/lib/toast";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let cancelled = false;

    const checkSupabase = async () => {
      try {
        const response = await fetch("/api/health/supabase");
        const data = await response.json().catch(() => ({}));

        if (!cancelled && (!response.ok || !data.ok)) {
          showToast(data.message || "Supabase connection check failed", "error");
        }
      } catch {
        if (!cancelled) {
          showToast("Supabase connection check failed", "error");
        }
      }
    };

    checkSupabase();

    return () => {
      cancelled = true;
    };
  }, []);

  return <LanguageProvider>{children}</LanguageProvider>;
}
