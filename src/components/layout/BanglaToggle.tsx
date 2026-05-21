"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function BanglaToggle() {
  const { toggle, locale } = useLanguage();
  return (
    <button
      onClick={toggle}
      className="fixed z-50 bottom-6 right-6 bg-[#0a1628]/80 backdrop-blur-xl text-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold border border-blue-500/20 hover:border-blue-500/40 transition-all"
      aria-label="Toggle language"
    >
      {locale === "en" ? "বাংলা 🇧🇩" : "English 🇺🇸"}
    </button>
  );
}
