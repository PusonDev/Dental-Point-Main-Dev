"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function BanglaToggle() {
  const { locale, toggle } = useLanguage();

  return (
    <button
      onClick={toggle}
      className="fixed z-50 bottom-4 left-4 md:bottom-6 md:left-6 bg-primary text-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold hover:bg-primary-light transition-colors"
      aria-label="Toggle language"
    >
      {locale === "en" ? "বাংলা" : "EN"}
    </button>
  );
}
