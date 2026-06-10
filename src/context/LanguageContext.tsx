"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import en from "@/translations/en.json";
import bn from "@/translations/bn.json";
import { deepMerge, getNestedValue } from "@/lib/i18n";

type Locale = "en" | "bn";
type Translations = typeof en;

const translations: Record<Locale, Translations> = { en, bn };

interface LanguageContextType {
  locale: Locale;
  t: Translations;
  tc: <T = string>(path: string, fallback?: T) => T;
  toggle: () => void;
  setLocale: (l: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const mergedTranslations = deepMerge(en, bn as Partial<typeof en>);

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved === "en" || saved === "bn") setLocaleState(saved);
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("locale", l);
  }, []);

  const toggle = useCallback(() => {
    setLocale(locale === "en" ? "bn" : "en");
  }, [locale, setLocale]);

  const tc = useCallback(<T,>(path: string, fallback?: T) => {
    const current = getNestedValue(translations[locale], path);
    const english = getNestedValue(en, path);
    return (current ?? english ?? fallback ?? path) as T;
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, t: mergedTranslations, tc, toggle, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
