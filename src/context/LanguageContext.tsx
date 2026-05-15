"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import en from "@/translations/en.json";
import bn from "@/translations/bn.json";

type Locale = "en" | "bn";
type Translations = typeof en;

const translations: Record<Locale, Translations> = { en, bn };

interface LanguageContextType {
  locale: Locale;
  t: Translations;
  toggle: () => void;
  setLocale: (l: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

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

  return (
    <LanguageContext.Provider value={{ locale, t: translations[locale], toggle, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
